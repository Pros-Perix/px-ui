import { useState } from "react";
import {
  Xandi,
  XandiProvider,
  XBaseListing,
  XHeader,
  XSidebar,
  type XandiResponse,
  type XandiConfig,
  type XandiHandlers,
  type GetConvOptions,
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

interface Worker {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  on_assignment_progress: number;
  assignment_title?: string;
  worker_type: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    intent: string;
    data: {
      jobs?: Job[];
      workers?: Worker[];
      pagination?: {
        page: number;
        per_page: number;
        total: number;
      };
    };
    conversation_id: string;
    tool_id?: string;
    operand?: unknown;
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

/** One Q&A pair from GET /conversation/{id}/messages */
interface ApiConversationMessage {
  id: number;
  trace_id: string;
  question: string;
  answer: string;
  feedback: number;
  created_at: string;
}

/** Response from GET /conversation/{id}/messages */
interface ConversationMessagesResponse {
  success: boolean;
  data: {
    conversation_id: string;
    messages: ApiConversationMessage[];
    pagination: {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
  };
  message: string;
}

const JOBS_LISTING_BASE = "https://app.uat.prosperix.com/jobs/listing/any";
const WORKERS_LISTING_BASE = "https://app.uat.prosperix.com/workers/listing/any";

function encodeOperandToFilter(operand: unknown): string {
  const json = JSON.stringify(operand ?? {});
  const base64 = typeof btoa !== "undefined"
    ? btoa(unescape(encodeURIComponent(json)))
    : Buffer.from(json, "utf-8").toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function listingUrl(base: string, operand: unknown): string {
  const filter = encodeOperandToFilter(operand);
  return `${base}?filter=${filter}`;
}

function JobCard({ job }: { job: Job }) {
  const date = new Date(job.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-ppx-foreground">{job.title}</span>
      <span className="text-ppx-xs text-ppx-neutral-10">
        {job.status} · {job.office_city}, {job.office_country}
      </span>
      <span className="text-ppx-xs text-ppx-neutral-10">{date}</span>
      <a
        href={`${JOBS_LISTING_BASE}/${job.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 text-ppx-xs text-ppx-green-5 hover:underline"
      >
        View Details →
      </a>
    </div>
  );
}

function WorkerCard({ worker }: { worker: Worker }) {
  const name = [worker.first_name, worker.last_name].filter(Boolean).join(" ") || "—";
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-ppx-foreground">{name}</span>
      <span className="text-ppx-xs text-ppx-neutral-10">{worker.email}</span>
      {worker.assignment_title != null && worker.assignment_title !== "" && (
        <span className="text-ppx-xs text-ppx-neutral-10">{worker.assignment_title}</span>
      )}
      <span className="text-ppx-xs text-ppx-neutral-10">
        {worker.worker_type}
        {worker.on_assignment_progress != null && (
          <> · {worker.on_assignment_progress}% on assignment</>
        )}
      </span>
      <a
        href={`${WORKERS_LISTING_BASE}/${worker.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 text-ppx-xs text-ppx-green-5 hover:underline"
      >
        View Details →
      </a>
    </div>
  );
}

function respTransformer(json: ApiResponse): XandiResponse {
  const toolId = json.data.tool_id ?? json.trace?.tool_id;
  const base = {
    conversationId: json.data.conversation_id,
    debugTrace: json.trace,
    toolId,
    intent: json.data.intent,
    operand: json.data.operand ?? json.data.data,
  };
  const data = json.data.data as {
    jobs?: Job[];
    workers?: Worker[];
    pagination?: { page: number; per_page: number; total: number };
  };

  if (toolId === "jobs.get" && data?.jobs && data.jobs.length > 0) {
    const viewAllHref = listingUrl(JOBS_LISTING_BASE, base.operand);
    return {
      ...base,
      content: (
        <XBaseListing<Job>
          title="Open Jobs"
          count={data.pagination?.total}
          items={data.jobs}
          actions={
            <a
              href={viewAllHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-ppx-sm font-medium text-ppx-green-5 hover:underline"
            >
              View All →
            </a>
          }
        >
          {(job) => <JobCard job={job} />}
        </XBaseListing>
      ),
    };
  }

  if (toolId === "workforce.get_worker" && data?.workers && data.workers.length > 0) {
    const viewAllHref = listingUrl(WORKERS_LISTING_BASE, base.operand);
    return {
      ...base,
      content: (
        <XBaseListing<Worker>
          title="People"
          count={data.pagination?.total}
          items={data.workers}
          actions={
            <a
              href={viewAllHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-ppx-sm font-medium text-ppx-green-5 hover:underline"
            >
              View All →
            </a>
          }
        >
          {(worker) => <WorkerCard worker={worker} />}
        </XBaseListing>
      ),
    };
  }

  return {
    ...base,
    content: json.message,
  };
}

// ============================================================================
// Handlers
// ============================================================================

const xandiHandlers: XandiHandlers = {
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

    return respTransformer(json);
  },

  // Get a conversation by ID (loads messages from /conversation/{id}/messages)
  getConv: async (
    conversationId: string,
    _options?: GetConvOptions
  ): Promise<Conversation> => {
    const response = await fetch(`${CONVERSATION_URL}/${conversationId}/messages`, {
      method: "GET",
      headers: getHeaders(),
    });

    const json: ConversationMessagesResponse = await response.json();

    if (!json.success) {
      throw new Error("Failed to get conversation messages");
    }

    const apiMessages = json.data.messages ?? [];
    const mappedMessages: { id: string; role: "user" | "assistant"; content: string }[] = [];

    for (const msg of apiMessages) {
      mappedMessages.push(
        { id: `${msg.id}-q`, role: "user", content: msg.question },
        { id: `${msg.id}-a`, role: "assistant", content: msg.answer }
      );
    }

    const firstAt = apiMessages[0]?.created_at;
    const lastAt = apiMessages[apiMessages.length - 1]?.created_at;

    return {
      id: json.data.conversation_id,
      title: "Chat",
      messages: mappedMessages,
      createdAt: firstAt ? new Date(firstAt) : new Date(),
      updatedAt: lastAt ? new Date(lastAt) : new Date(),
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

  return (
    <div className="flex h-[600px] w-full overflow-hidden rounded-lg border border-ppx-neutral-5 bg-ppx-background">
      <XandiProvider handlers={xandiHandlers} config={xandiConfig}>
        {/* Sidebar - fetches history via getConvHistory from context */}
        <XSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <XHeader
            onClose={() => {}}
            onToggleHistory={() => setSidebarOpen((prev) => !prev)}
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
