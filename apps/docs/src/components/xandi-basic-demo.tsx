import { useState } from "react";
import {
  Xandi,
  XandiProvider,
  XHeader,
  XSidebar,
  type ChatHistoryItem,
  type XandiResponse,
  type XandiConfig,
  type XandiHandlers,
  type FeedbackType,
} from "@px-ui/ai";

const API_URL = "http://localhost:8080/chat";
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

const mockChatHistory: ChatHistoryItem[] = [
  { id: "1", title: "What should I work on next?", timestamp: new Date() },
  { id: "2", title: "Help me write a job posting.", timestamp: new Date() },
  { id: "3", title: "Find me similar job posts.", timestamp: new Date() },
  { id: "4", title: "Summarize the status and history of project...", timestamp: new Date() },
  { id: "5", title: "I want to create a ticket", timestamp: new Date() },
  { id: "6", title: "How many issues are assigned to me?", timestamp: new Date() },
];

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
      headers: {
        "Content-Type": "application/json",
        "x-org-id": ORG_ID,
        "x-user-id": USER_ID,
      },
      body: JSON.stringify({
        message,
        conversation_id: options?.conversationId,
      }),
      signal: options?.signal, // Pass abort signal to fetch
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

  // Handle feedback submission
  onFeedback: (messageId: string, conversationId: string, feedback: FeedbackType) => {
    console.log("Feedback submitted:", { messageId, conversationId, feedback });
    // In a real app, send this to your feedback API
  },

  // Handle stop request
  onStop: (conversationId: string) => {
    console.log("Request stopped for conversation:", conversationId);
    // In a real app, cancel the ongoing request
  },

  // Get conversation history (optional)
  getConvHistory: async () => {
    // In a real app, fetch from API
    return mockChatHistory;
  },
};

export function XandiBasicDemo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | undefined>();

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    // In a real app, this would load the selected chat
  };

  return (
    <div className="flex h-[600px] w-full overflow-hidden rounded-lg border border-ppx-neutral-5 bg-ppx-background">
      <XandiProvider handlers={xandiHandlers} config={xandiConfig}>
        {/* Sidebar */}
        <XSidebar
          isOpen={sidebarOpen}
          chatHistory={mockChatHistory}
          activeChatId={activeChatId}
          onClose={() => setSidebarOpen(false)}
          onSelectChat={handleSelectChat}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <XHeader
            onClose={() => {}}
            onToggleHistory={() => setSidebarOpen(!sidebarOpen)}
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
