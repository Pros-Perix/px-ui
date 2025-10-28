import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Select from "../../src/components/select";
import { SelectedValue } from "../../src/components/select";

const posts = [
  { label: "Select post", value: "" },
  {
    label: "Understanding React Hooks and dependencies",
    value: "post-1",
  },
  { label: "Getting Started with TypeScript", value: "post-2" },
  { label: "CSS Grid Layout Tutorial", value: "post-3" },
  { label: "JavaScript ES6 Features", value: "post-4" },
  { label: "Building REST APIs with Node.js", value: "post-5" },
  { label: "React Performance Optimization", value: "post-6" },
  { label: "Introduction to GraphQL", value: "post-7" },
  { label: "State Management with Redux", value: "post-8" },
  { label: "Web Accessibility Guidelines", value: "post-9" },
  { label: "Testing React Applications", value: "post-10" },
  { label: "Docker for Beginners", value: "post-11" },
  { label: "Git Version Control Basics", value: "post-12" },
  { label: "Responsive Web Design", value: "post-13" },
  { label: "Next.js Framework Overview", value: "post-14" },
  { label: "MongoDB Database Design", value: "post-15" },
];

const users = [
  { name: "Select user", userId: "" },
  { name: "Emma Thompson", userId: "user-1234" },
  { name: "Michael Chen", userId: "user-5678" },
  { name: "Sofia Rodriguez", userId: "user-9012" },
  { name: "James Wilson", userId: "user-3456" },
  { name: "Aisha Patel", userId: "user-7890" },
  { name: "Lucas Anderson", userId: "user-2345" },
  { name: "Maria Garcia", userId: "user-6789" },
  { name: "David Kim", userId: "user-0123" },
  { name: "Sarah Johnson", userId: "user-4567" },
  { name: "Omar Hassan", userId: "user-8901" },
];

const meta: Meta<typeof Select> = {
  component: ExampleSelect,
  title: "Components/Select",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

export const Default: StoryObj<typeof Select> = {
  render: () => <ExampleSelect />,
};

function ExampleSelect() {
  return (
    <>
      <Select.Root>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="">Select post</Select.Item>
            <Select.Item value="sans">Sans-serif</Select.Item>
            <Select.Item value="serif">Serif</Select.Item>
            <Select.Item value="mono">Monospace</Select.Item>
            <Select.Item value="cursive">Cursive</Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>
    </>
  );
}

export function WithCustomRendering() {
  return (
    <>
      <Select.Root>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            {posts.map((post) => (
              <Select.Item key={post.value} value={post}>
                {post.label}
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select.Root>
    </>
  );
}

export function MultipleSelection() {
  const [selected, setSelected] = React.useState<(typeof users)[number][]>([]);

  return (
    <>
      <Select.Root multiple value={selected} onValueChange={setSelected}>
        <Select.Trigger>
          <Select.Value>
            {(selectedValue: SelectedValue<typeof users>) => (
              <Select.MultiSelectedValue
                selectedValue={selectedValue?.map((value) => value.name)}
                maxItems={2}
              />
            )}
          </Select.Value>
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            {users.map((user) => (
              <Select.MultiItem key={user.userId} value={user}>
                {user.name}
              </Select.MultiItem>
            ))}
          </Select.List>
        </Select.Content>
      </Select.Root>
    </>
  );
}

export function WithCustomObjects() {
  const [selected, setSelected] = React.useState<(typeof users)[number]>(
    users[0],
  );

  return (
    <Select.Root value={selected} onValueChange={setSelected}>
      <Select.Trigger size="sm">
        <Select.Value>
          {(selectedValue: SelectedValue<(typeof users)[number]>) =>
            selectedValue?.name
          }
        </Select.Value>
      </Select.Trigger>

      <Select.Content>
        <Select.List>
          {users.map((user) => (
            <Select.Item key={user.userId} value={user}>
              {user.name}
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}
