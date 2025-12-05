import React, { createContext, useContext } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export interface DndGridItem {
  id: string | number;
  [key: string]: any;
}

interface DndGridContextValue {
  items: DndGridItem[];
  onReorder: (newItems: DndGridItem[]) => void;
}

const DndGridContext = createContext<DndGridContextValue | null>(null);

interface SortableItemContextValue {
  listeners?: Record<string, any>;
  attributes?: Record<string, any>;
}

const SortableItemContext = createContext<SortableItemContextValue | null>(null);

export interface DndGridProps {
  items: DndGridItem[];
  onReorder: (newItems: DndGridItem[]) => void;
  children: React.ReactNode;
  columns?: number | { sm?: number; md?: number; lg?: number };
  gap?: number;
  className?: string;
}

interface DndGridItemProps {
  id: string | number;
  children: React.ReactNode;
  className?: string;
}

interface DndGridHandleProps {
  children: React.ReactNode;
  className?: string;
}

const DndGridItem: React.FC<DndGridItemProps> = ({ id, children, className = "" }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <SortableItemContext.Provider value={{ listeners, attributes }}>
      <div ref={setNodeRef} style={style} {...attributes} className={className}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
};

const DndGridHandle: React.FC<DndGridHandleProps> = ({ children, className = "" }) => {
  const context = useContext(SortableItemContext);

  if (!context) {
    throw new Error("DndGrid.Handle must be used within DndGrid.Item");
  }

  const { listeners } = context;

  return (
    <div {...listeners} className={className} style={{ cursor: "grab" }}>
      {children}
    </div>
  );
};

export function DndGrid({
  items,
  onReorder,
  children,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 16,
  className = "",
}: DndGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gap: `${gap}px`,
    ...(typeof columns === "number"
      ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
      : {}),
  };

  const gridClasses = typeof columns !== "number"
    ? `grid-cols-${columns.sm || 1} md:grid-cols-${columns.md || 2} lg:grid-cols-${columns.lg || 3}`
    : "";

  return (
    <DndGridContext.Provider value={{ items, onReorder }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
          <div
            className={`grid ${gridClasses} ${className}`}
            style={{ gap: `${gap}px`, ...gridStyle }}
          >
            {children}
          </div>
        </SortableContext>
      </DndContext>
    </DndGridContext.Provider>
  );
}

DndGrid.Item = DndGridItem;
DndGrid.Handle = DndGridHandle;
