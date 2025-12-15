import { Tabs } from "@px-ui/core";

export function TabsUnderlineDemo() {
  return (
    <Tabs.Root defaultValue="posts" variant="underline">
      <Tabs.List>
        <Tabs.Trigger value="posts">Posts</Tabs.Trigger>
        <Tabs.Trigger value="comments">Comments</Tabs.Trigger>
        <Tabs.Trigger value="likes">Likes</Tabs.Trigger>
        <Tabs.Trigger value="shares">Shares</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="posts">
        <div className="p-4">
          <p className="text-ppx-sm">Your published posts and articles.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="comments">
        <div className="p-4">
          <p className="text-ppx-sm">Comments and discussions on your content.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="likes">
        <div className="p-4">
          <p className="text-ppx-sm">Content you've liked or favorited.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="shares">
        <div className="p-4">
          <p className="text-ppx-sm">Content you've shared with others.</p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
