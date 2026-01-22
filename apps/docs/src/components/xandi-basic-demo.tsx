import { useState } from "react";
import { Xandi, XandiProvider, XHeader, XSidebar, type ChatHistoryGroup, type XandiResponse } from "@px-ui/ai";

const API_URL = "http://localhost:3001/query";
const USER_ID = "0108e28d-ec3b-4648-9178-b4a2c0d582ba";
const ORG_ID = "e37723a6-4363-4831-86e0-5e4950ed15ec";

const suggestions = [
  { id: "1", label: "Open Jobs", prompt: "Show me all open jobs" },
  { id: "2", label: "Jobs Pending Approval", prompt: "Show me jobs pending for approval" },
  { id: "3", label: "Pending Timesheets", prompt: "Show me timesheets pending for approval" },
];

const mockChatHistory: ChatHistoryGroup[] = [
  {
    label: "This past week",
    items: [
      { id: "1", title: "What should I work on next?", timestamp: new Date() },
      { id: "2", title: "Help me write a job posting.", timestamp: new Date() },
      { id: "3", title: "Find me similar job posts.", timestamp: new Date() },
    ],
  },
  {
    label: "This past month",
    items: [
      { id: "4", title: "Summarize the status and history of project...", timestamp: new Date() },
      { id: "5", title: "I want to create a ticket", timestamp: new Date() },
      { id: "6", title: "How many issues are assigned to me?", timestamp: new Date() },
    ],
  },
];

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
  data?: {
    response: string;
    intent: string;
    data?: {
      jobs?: Job[];
      pagination?: {
        page: number;
        per_page: number;
        total: number;
      };
    };
  };
  message: string;
  trace?: unknown;
}

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

async function fetchXandiResponse(message: string): Promise<XandiResponse> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-org-id": ORG_ID,
      "x-user-id": USER_ID,
    },
    body: JSON.stringify({ message }),
  });

  const json: ApiResponse = await response.json();

  if (!json.success) {
    throw new Error("Failed to get response");
  }

  let content = json.data?.response ?? json.message;

  // Transform jobs data into markdown
  if (json.data?.data?.jobs && json.data.data.jobs.length > 0) {
    content = formatJobsAsMarkdown(json.data.data.jobs, json.data.data.pagination);
  }

  return {
    content,
    debugTrace: json.trace,
  };
}

export function XandiBasicDemo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | undefined>();

  const handleNewChat = () => {
    setActiveChatId(undefined);
    // In a real app, this would reset the chat state
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    // In a real app, this would load the selected chat
  };

  return (
    <div className="flex h-[600px] w-full overflow-hidden rounded-lg border border-ppx-neutral-5 bg-ppx-background">
      {/* Sidebar */}
      <XSidebar
        isOpen={sidebarOpen}
        chatHistory={mockChatHistory}
        activeChatId={activeChatId}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <XHeader
          onClose={() => {}}
          onNewChat={handleNewChat}
          onToggleHistory={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden px-4 py-2">
          <XandiProvider fetchResponse={fetchXandiResponse}>
            <Xandi suggestions={suggestions} />
          </XandiProvider>
        </div>
      </div>
    </div>
  );
}
