import { useState } from "react";
import {
  Xandi,
  XandiProvider,
  XHeader,
  XSidebar,
  useXandi,
  type ChatHistoryItem,
  type XandiResponse,
  type XandiConfig,
  type XandiHandlers,
  type FeedbackType,
  type Conversation,
  type ConversationSummary,
} from "@px-ui/ai";

const API_BASE = "http://localhost:8080";
const API_URL = `${API_BASE}/chat`;
const CONVERSATION_URL = `${API_BASE}/conversation`;
const USER_ID = "0108e28d-ec3b-4648-9178-b4a2c0d582ba";
const ORG_ID = "e37723a6-4363-4831-86e0-5e4950ed15ec";

// Custom avatar URL (can be passed from parent or fetched from API)
const CUSTOM_AVATAR_URL = "https://prosperix.ai/assets/xandi-avatar-CbNInruf.png";

const xandiConfig: XandiConfig = {
  avatarUrl: CUSTOM_AVATAR_URL,
  assistantName: "Xandi",
};

const suggestions = [
  { id: "1", label: "Open Jobs", prompt: "Show me all open jobs" },
  { id: "2", label: "Jobs Pending Approval", prompt: "Show me jobs pending for approval" },
  { id: "3", label: "Pending Timesheets", prompt: "Show me timesheets pending for approval" },
];

// Helper to get common headers
const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-org-id": ORG_ID,
  "x-user-id": USER_ID,
});

// ============================================================================
// API Types
// ============================================================================

interface Job {
  id: string;
  title: string;
  status: string;
  office_country: string;
  office_city: string;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    intent: string;
    data: {
      jobs?: Job[];
      pagination?: {
        page: number;
        per_page: number;
        total: number;
      };
    };
    conversation_id: string;
  };
  trace?: {
    trace_id: string;
    execution_mode: string;
    intent: string;
    tool_id: string;
    debug_trace: unknown;
  };
}

interface ApiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

interface ApiConversationListItem {
  conversation_id: string;
  trace_id: string;
  first_question: string;
  last_activity_at: string;
}

interface ApiConversationDetail {
  id: string;
  title: string;
  messages: ApiMessage[];
  created_at: string;
  updated_at: string;
}

interface ConversationListResponse {
  success: boolean;
  data: {
    conversations: ApiConversationListItem[];
  };
  message: string;
}

interface ConversationDetailResponse {
  success: boolean;
  data: ApiConversationDetail;
}

// ============================================================================
// Helpers
// ============================================================================

function formatJobsAsMarkdown(jobs: Job[], pagination?: { page: number; per_page: number; total: number }): string {
  const lines: string[] = [];

  if (pagination) {
    lines.push(`Found **${pagination.total}** job(s) | Page ${pagination.page}\n`);
  }

  jobs.forEach((job, index) => {
    const date = new Date(job.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const statusEmoji = job.status === "Open" ? "🟢" : job.status === "Draft" ? "📝" : "⚪";

    lines.push(`**${index + 1}. ${job.title}**`);
    lines.push(`${statusEmoji} ${job.status} · ${job.office_city}, ${job.office_country} · ${date}`);
    lines.push(`[View Details →](https://app.prosperix.com/jobs/listing/any/${job.id})\n`);
  });

  return lines.join("\n");
}

// ============================================================================
// Handlers
// ============================================================================

const xandiHandlers: XandiHandlers = {
  // Fetch AI response
  fetchResp: async (message, options): Promise<XandiResponse> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        message,
        conversation_id: options?.conversationId,
      }),
      signal: options?.signal,
    });

    const json: ApiResponse = await response.json();

    if (!json.success) {
      throw new Error("Failed to get response");
    }

    // Transform response content
    let content = json.message;

    // Transform jobs data into markdown if present
    if (json.data?.data?.jobs && json.data.data.jobs.length > 0) {
      content = formatJobsAsMarkdown(json.data.data.jobs, json.data.data.pagination);
    }

    return {
      content,
      conversationId: json.data.conversation_id,
      debugTrace: json.trace,
    };
  },

  // Get a conversation by ID
  getConv: async (conversationId: string): Promise<Conversation> => {
    const response = await fetch(`${CONVERSATION_URL}/${conversationId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    const json: ConversationDetailResponse = await response.json();

    if (!json.success) {
      throw new Error("Failed to get conversation");
    }

    const conv = json.data;
    return {
      id: conv.id,
      title: conv.title,
      messages: conv.messages.map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
      })),
      createdAt: new Date(conv.created_at),
      updatedAt: new Date(conv.updated_at),
    };
  },

  // Get conversation history list
  getConvHistory: async (): Promise<ConversationSummary[]> => {
    const response = await fetch(CONVERSATION_URL, {
      method: "GET",
      headers: getHeaders(),
    });

    const json: ConversationListResponse = await response.json();

    if (!json.success) {
      throw new Error("Failed to get conversation history");
    }

    const conversations = json.data?.conversations ?? [];
    return conversations.map((conv) => ({
      id: conv.conversation_id,
      title: conv.first_question,
      timestamp: new Date(conv.last_activity_at),
    }));
  },

  // Handle feedback submission
  onFeedback: (messageId: string, conversationId: string, feedback: FeedbackType) => {
    console.log("Feedback submitted:", { messageId, conversationId, feedback });
    // TODO: POST to feedback API
  },

  // Handle stop request
  onStop: (conversationId: string) => {
    console.log("Request stopped for conversation:", conversationId);
    // TODO: Cancel ongoing request on backend if needed
  },
};

export function XandiBasicDemo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);

  // Fetch conversation history when sidebar opens
  const handleToggleHistory = async () => {
    if (!sidebarOpen) {
      try {
        const history = await xandiHandlers.getConvHistory?.();
        if (history) {
          setChatHistory(history);
        }
      } catch (error) {
        console.error("Failed to fetch conversation history:", error);
      }
    }
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-[600px] w-full overflow-hidden rounded-lg border border-ppx-neutral-5 bg-ppx-background">
      <XandiProvider handlers={xandiHandlers} config={xandiConfig}>
        {/* Sidebar */}
        <XSidebarWithContext
          isOpen={sidebarOpen}
          chatHistory={chatHistory}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <XHeader
            onClose={() => {}}
            onToggleHistory={handleToggleHistory}
          />

          {/* Chat Area */}
          <div className="flex-1 overflow-hidden px-4 py-2">
            <Xandi suggestions={suggestions} />
          </div>
        </div>
      </XandiProvider>
    </div>
  );
}

// Wrapper component that uses context for loadConversation
function XSidebarWithContext({
  isOpen,
  chatHistory,
  onClose,
}: {
  isOpen: boolean;
  chatHistory: ChatHistoryItem[];
  onClose: () => void;
}) {
  const { loadConversation, conversation } = useXandi();

  const handleSelectChat = (chatId: string) => {
    loadConversation(chatId);
  };

  return (
    <XSidebar
      isOpen={isOpen}
      chatHistory={chatHistory}
      activeChatId={conversation.id ?? undefined}
      onClose={onClose}
      onSelectChat={handleSelectChat}
    />
  );
}
