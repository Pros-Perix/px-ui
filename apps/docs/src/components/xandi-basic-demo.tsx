import { useState } from "react";
import { Xandi, XandiProvider, XHeader, XSidebar, type ChatHistoryGroup } from "@px-ui/ai";

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
          <XandiProvider
            api="http://localhost:3001/query"
            userId="0108e28d-ec3b-4648-9178-b4a2c0d582ba"
            orgId="e37723a6-4363-4831-86e0-5e4950ed15ec"
          >
            <Xandi suggestions={suggestions} />
          </XandiProvider>
        </div>
      </div>
    </div>
  );
}
