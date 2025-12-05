import type { Meta, StoryObj } from "@storybook/react";
import * as Card from "../../src/components/card";
import { Button } from "../../src/components/button";

const meta: Meta<typeof Card.Root> = {
  title: "Components/Card",
  component: Card.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card.Root>;

export const Default: Story = {
  render: () => (
    <Card.Root className="w-[350px]">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description goes here</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>Card content goes here. You can add any content you like.</p>
      </Card.Content>
      <Card.Footer className="justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card.Root>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card.Root className="w-[350px]">
      <Card.Header>
        <Card.Title>Notifications</Card.Title>
        <Card.Description>You have 3 unread messages</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">New message from John</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Meeting reminder</p>
              <p className="text-sm text-gray-500">10 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Task completed</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  ),
};

export const Stats: Story = {
  render: () => (
    <Card.Root className="w-[350px]">
      <Card.Header>
        <Card.Title>Total Revenue</Card.Title>
        <Card.Description>January 2024</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="text-4xl font-bold">$45,231</div>
        <p className="text-sm text-green-600 mt-2">+20.1% from last month</p>
      </Card.Content>
    </Card.Root>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card.Root className="w-[350px] overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      <Card.Header>
        <Card.Title>Beautiful Gradient</Card.Title>
        <Card.Description>A card with an image header</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm">
          This card demonstrates how you can use any content in combination with
          the card components.
        </p>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">View Details</Button>
      </Card.Footer>
    </Card.Root>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card.Root className="w-[350px]">
      <Card.Content className="pt-6">
        <p>
          A simple card with just content, no header or footer. Perfect for
          minimal designs.
        </p>
      </Card.Content>
    </Card.Root>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card.Root className="w-[350px] hover:shadow-md transition-shadow cursor-pointer">
      <Card.Header>
        <Card.Title>Click me</Card.Title>
        <Card.Description>This card is interactive</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm">
          Hover over this card to see the shadow effect. You can make cards
          interactive by adding hover states and click handlers.
        </p>
      </Card.Content>
    </Card.Root>
  ),
};
