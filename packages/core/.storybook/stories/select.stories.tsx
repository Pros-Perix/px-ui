import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Select from "../../src/components/select/base";
import { Avatar } from "../../src/components/avatar";

const posts = [
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

const fonts = [
  { label: "Select font", value: null },
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
  { label: "Cursive", value: "cursive" },
];

const users = [
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
        <Select.Trigger placeholder="Select font" />
        <Select.Content>
          <Select.List>
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
        <Select.Trigger placeholder="Select post" />
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

export function WithAutoSize() {
  return (
    <>
      <Select.Root>
        <Select.Trigger size="auto" placeholder="Select font" />
        <Select.Content>
          <Select.List>
            <Select.Item value="sans">Sans-serif</Select.Item>
            <Select.Item value="serif">Serif</Select.Item>
            <Select.Item value="mono">Monospace</Select.Item>
            <Select.Item value="cursive">Cursive</Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>{" "}
    </>
  );
}

export function MultipleSelection() {
  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <>
      <Select.Root multiple value={selected} onValueChange={setSelected}>
        <Select.Trigger placeholder="Select users">
          {(selectedValue) => (
            <Select.MultiSelectedValue
              selectedValue={selectedValue}
              maxItems={2}
            />
          )}
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.MultiItem value="user-1234">Emma Thompson</Select.MultiItem>
            <Select.MultiItem value="user-5678">Michael Chen</Select.MultiItem>
            <Select.MultiItem value="user-9012">
              Sofia Rodriguez
            </Select.MultiItem>
            <Select.MultiItem value="user-3456">James Wilson</Select.MultiItem>
            <Select.MultiItem value="user-7890">Aisha Patel</Select.MultiItem>
            <Select.MultiItem value="user-2345">
              Lucas Anderson
            </Select.MultiItem>
            <Select.MultiItem value="user-6789">Maria Garcia</Select.MultiItem>
            <Select.MultiItem value="user-0123">David Kim</Select.MultiItem>
            <Select.MultiItem value="user-4567">Sarah Johnson</Select.MultiItem>
            <Select.MultiItem value="user-8901">Omar Hassan</Select.MultiItem>
          </Select.List>
        </Select.Content>
      </Select.Root>
    </>
  );
}
