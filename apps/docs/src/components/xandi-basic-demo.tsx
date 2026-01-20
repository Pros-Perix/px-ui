import { Xandi } from "@px-ui/ai";

const suggestions = [
  { id: "1", label: "Open Jobs", prompt: "Show me all open jobs" },
  { id: "2", label: "Jobs Pending Approval", prompt: "Show me jobs pending for approval" },
  { id: "3", label: "Pending Timesheets", prompt: "Show me timesheets pending for approval" },
];

export function XandiBasicDemo() {
  return (
    <div className="bg-ppx-background w-full">
      <Xandi api="http://localhost:3001/query" suggestions={suggestions} />
    </div>
  );
}
