import { Xandi, XandiProvider } from "@px-ui/ai";

const suggestions = [
  { id: "1", label: "Open Jobs", prompt: "Show me all open jobs" },
  { id: "2", label: "Jobs Pending Approval", prompt: "Show me jobs pending for approval" },
  { id: "3", label: "Pending Timesheets", prompt: "Show me timesheets pending for approval" },
];

export function XandiBasicDemo() {
  return (
    <div className="bg-ppx-background w-full">
      <XandiProvider
        api="http://localhost:3001/query"
        userId="0108e28d-ec3b-4648-9178-b4a2c0d582ba"
        orgId="e37723a6-4363-4831-86e0-5e4950ed15ec"
      >
        <Xandi suggestions={suggestions} />
      </XandiProvider>
    </div>
  );
}
