import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Combobox from "../../src/components/combobox/base";
import { Avatar } from "../../src/components/avatar";

const posts = [
  {
    label: "Understanding React Hooks and dependencies, React with TypeScript",
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
  { label: "AWS Cloud Services Guide", value: "post-16" },
  { label: "CI/CD Pipeline Setup", value: "post-17" },
  { label: "Vue.js Component Patterns", value: "post-18" },
  { label: "Python Web Scraping", value: "post-19" },
  { label: "Microservices Architecture", value: "post-20" },
  { label: "Angular Framework Basics", value: "post-21" },
  { label: "Progressive Web Apps", value: "post-22" },
  { label: "SQL Database Optimization", value: "post-23" },
  { label: "Kubernetes Deployment Guide", value: "post-24" },
  { label: "Web Security Best Practices", value: "post-25" },
];

const posts2 = [
  { post: "Post 1", postId: "post-id-1" },
  { post: "Post 2", postId: "post-id-2" },
  { post: "Post 3", postId: "post-id-3" },
  { post: "Post 4", postId: "post-id-4" },
  { post: "Post 5", postId: "post-id-5" },
  { post: "Post 6", postId: "post-id-6" },
  { post: "Post 7", postId: "post-id-7" },
  { post: "Post 8", postId: "post-id-8" },
  { post: "Post 9", postId: "post-id-9" },
  { post: "Post 10", postId: "post-id-10" },
  { post: "Post 11", postId: "post-id-11" },
  { post: "Post 12", postId: "post-id-12" },
  { post: "Post 13", postId: "post-id-13" },
  { post: "Post 14", postId: "post-id-14" },
  { post: "Post 15", postId: "post-id-15" },
  { post: "Post 16", postId: "post-id-16" },
  { post: "Post 17", postId: "post-id-17" },
  { post: "Post 18", postId: "post-id-18" },
  { post: "Post 19", postId: "post-id-19" },
  { post: "Post 20", postId: "post-id-20" },
  { post: "Post 21", postId: "post-id-21" },
  { post: "Post 22", postId: "post-id-22" },
  { post: "Post 23", postId: "post-id-23" },
  { post: "Post 24", postId: "post-id-24" },
  { post: "Post 25", postId: "post-id-25" },
];

const meta: Meta<typeof Combobox> = {
  component: ExampleCombobox,
  title: "Components/combobox",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

export const Default: StoryObj<typeof Combobox> = {
  render: () => <ExampleCombobox />,
};

function ExampleCombobox() {
  const id = React.useId();

  return (
    <>
      <label htmlFor={id}>Enter a fruit</label>
      <Combobox.Root items={posts2} itemToStringLabel={(item) => item.post}>
        <Combobox.SearchableTrigger />
        <Combobox.Content>
          <Combobox.List>
            {(item: (typeof posts2)[number]) => (
              <Combobox.Item key={item.postId} value={item}>
                {item.post}
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>
    </>
  );
}

export function WithCustomizableOnlyTrigger() {
  return (
    <>
      <Combobox.Root items={posts}>
        <Combobox.Trigger placeholder="Select post">
          {(selectedValue) => (
            <div className="gap-2 flex items-center truncate">
              <Avatar
                imgSrc="https://github.com/shadcn.png"
                name="John Doe"
                size="20px"
                variant="rounded"
              />
              <span className="flex-1 truncate">{selectedValue?.label}</span>
            </div>
          )}
        </Combobox.Trigger>
        <Combobox.Content>
          <Combobox.List>
            {(item: (typeof posts)[number]) => (
              <Combobox.Item key={item.value} value={item}>
                {item.label}{" "}
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>
    </>
  );
}

export function WithOnlyIconWithNoSelectedValue() {
  return (
    <>
      <Combobox.Root items={posts}>
        <Combobox.Trigger size="auto">
          <Avatar
            imgSrc="https://github.com/shadcn.png"
            name="John Doe"
            size="20px"
            variant="rounded"
          />
        </Combobox.Trigger>
        <Combobox.Content>
          <Combobox.List>
            {(item: (typeof posts)[number]) => (
              <Combobox.Item key={item.value} value={item}>
                {item.label}{" "}
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>
    </>
  );
}

export function WithSearchOnPopup() {
  return (
    <>
      <Combobox.Root items={posts}>
        <Combobox.Trigger placeholder="Select post" />
        <Combobox.Content>
          <Combobox.Search />
          <Combobox.List>
            {(item: (typeof posts)[number]) => (
              <Combobox.Item key={item.value} value={item}>
                {item.label}
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>
    </>
  );
}
