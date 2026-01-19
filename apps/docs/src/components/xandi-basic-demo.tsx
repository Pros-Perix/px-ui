import { Xandi } from "@px-ui/ai";

export function XandiBasicDemo() {
  return (
    <div className="border border-ppx-neutral-5 rounded-ppx-m p-4 bg-ppx-background">
      <Xandi api="http://localhost:3001/query" />
    </div>
  );
}

