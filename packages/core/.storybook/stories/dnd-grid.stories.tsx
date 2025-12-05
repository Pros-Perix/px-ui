import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DndGrid, DndGridItem } from "../../src/components/dnd-grid";
import * as Card from "../../src/components/card";

// Icon component for drag handle
const GripIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ color: "#9ca3af" }}
  >
    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
  </svg>
);

const WithDragHandle = () => {
  const [items, setItems] = useState<DndGridItem[]>([
    { id: 1, title: "Widget 1", content: "Drag using the handle on the left" },
    { id: 2, title: "Widget 2", content: "Only the grip icon is draggable" },
    { id: 3, title: "Widget 3", content: "This prevents accidental drags" },
    { id: 4, title: "Widget 4", content: "Perfect for interactive content" },
    { id: 5, title: "Widget 5", content: "Like buttons or inputs" },
    { id: 6, title: "Widget 6", content: "Try clicking vs dragging!" },
  ]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px" }}>
      <DndGrid items={items} onReorder={setItems} columns={{ sm: 1, md: 2, lg: 3 }} gap={16}>
        {items.map((item) => (
          <DndGrid.Item key={item.id} id={item.id}>
            <Card.Root>
              <Card.Header className="flex-row items-center gap-3">
                <DndGrid.Handle>
                  <GripIcon />
                </DndGrid.Handle>
                <div className="flex-1">
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Description>{item.content}</Card.Description>
                </div>
              </Card.Header>
            </Card.Root>
          </DndGrid.Item>
        ))}
      </DndGrid>
    </div>
  );
};

const WithTopHandle = () => {
  const [items, setItems] = useState<DndGridItem[]>([
    { id: 1, title: "Dashboard Stats", value: "1,234", metric: "Total users" },
    { id: 2, title: "Recent Activity", value: "5", metric: "New signups today" },
    { id: 3, title: "Revenue", value: "$12,345", metric: "This month" },
  ]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px" }}>
      <DndGrid items={items} onReorder={setItems} columns={{ sm: 1, md: 2, lg: 3 }} gap={16}>
        {items.map((item) => (
          <DndGrid.Item key={item.id} id={item.id}>
            <Card.Root>
              <DndGrid.Handle>
                <Card.Header className="bg-gray-50/50 cursor-grab active:cursor-grabbing">
                  <div className="flex items-center gap-2">
                    <GripIcon />
                    <Card.Title className="text-sm">{item.title}</Card.Title>
                  </div>
                </Card.Header>
              </DndGrid.Handle>
              <Card.Content className="pt-6">
                <div className="text-3xl font-bold">{item.value}</div>
                <p className="text-sm text-gray-500 mt-1">{item.metric}</p>
              </Card.Content>
            </Card.Root>
          </DndGrid.Item>
        ))}
      </DndGrid>
    </div>
  );
};

const WithCustomHandle = () => {
  const [items, setItems] = useState<DndGridItem[]>([
    { id: 1, title: "Task 1", description: "Complete the project" },
    { id: 2, title: "Task 2", description: "Review pull requests" },
    { id: 3, title: "Task 3", description: "Update documentation" },
  ]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px" }}>
      <DndGrid items={items} onReorder={setItems} columns={1} gap={12}>
        {items.map((item) => (
          <DndGrid.Item key={item.id} id={item.id}>
            <Card.Root>
              <Card.Content className="flex items-center gap-3 pt-6">
                <input type="checkbox" className="w-5 h-5" />
                <div className="flex-1">
                  <Card.Title className="text-base">{item.title}</Card.Title>
                  <Card.Description>{item.description}</Card.Description>
                </div>
                <DndGrid.Handle>
                  <div className="px-3 py-2 bg-gray-50 rounded text-xs font-semibold text-gray-500 cursor-grab active:cursor-grabbing">
                    ⋮⋮
                  </div>
                </DndGrid.Handle>
              </Card.Content>
            </Card.Root>
          </DndGrid.Item>
        ))}
      </DndGrid>
    </div>
  );
};

const TwoColumns = () => {
  const [items, setItems] = useState<DndGridItem[]>([
    { id: 1, title: "Widget 1", content: "Two column layout" },
    { id: 2, title: "Widget 2", content: "Perfect for tablets" },
    { id: 3, title: "Widget 3", content: "Drag me around!" },
    { id: 4, title: "Widget 4", content: "Fixed columns" },
  ]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px" }}>
      <DndGrid items={items} onReorder={setItems} columns={2} gap={16}>
        {items.map((item) => (
          <DndGrid.Item key={item.id} id={item.id}>
            <Card.Root>
              <Card.Header className="flex-row items-center gap-3">
                <DndGrid.Handle>
                  <GripIcon />
                </DndGrid.Handle>
                <div className="flex-1">
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Description>{item.content}</Card.Description>
                </div>
              </Card.Header>
            </Card.Root>
          </DndGrid.Item>
        ))}
      </DndGrid>
    </div>
  );
};

const meta: Meta<typeof DndGrid> = {
  title: "Components/DndGrid",
  component: DndGrid,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

export const WithDragHandleStory = {
  render: WithDragHandle,
  name: "With Drag Handle (Left)",
};

export const WithTopHandleStory = {
  render: WithTopHandle,
  name: "With Top Handle Bar",
};

export const WithCustomHandleStory = {
  render: WithCustomHandle,
  name: "With Custom Handle (Right)",
};

export const TwoColumnsStory = {
  render: TwoColumns,
  name: "Two Columns Layout",
};
