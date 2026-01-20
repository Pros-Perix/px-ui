import { Xandi } from "@px-ui/ai";

export function XandiBasicDemo() {
  return (
    <div className="bg-ppx-background w-full">
      <Xandi api="http://localhost:3001/query" />
    </div>
  );
}

