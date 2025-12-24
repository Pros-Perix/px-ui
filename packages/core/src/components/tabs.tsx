import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { cn } from "../utils";

type TabsVariant = "underline";

type TabsContext = {
  variant: TabsVariant;
};

const TabsContext = React.createContext<TabsContext | null>(null);

const useTabs = () => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs must be used within a Tabs");
  }

  return context;
};

export function Root({
  variant = "underline",
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Root> & {
  variant?: TabsVariant;
}) {
  return (
    <TabsContext.Provider value={{ variant }}>
      <BaseTabs.Root
        data-slot="tabs"
        className={cn("gap-2 flex flex-col", className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

export function List({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      data-slot="tabs-list"
      className={cn(
        "text-muted-foreground h-9 gap-x-1 p-1 relative z-0 inline-flex w-fit items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      <Indicator />
      <div
        className={
          "absolute top-[calc(100%-1px)] left-1/2 z-2 h-[2px] w-[calc(100%-8px)] -translate-x-1/2 bg-[#EFEFEF]"
        }
      />
    </BaseTabs.List>
  );
}

export function Trigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      data-slot="tabs-trigger"
      className={cn(
        "focus-visible:ring-ring/50 [&_svg:not([class*='size-'])] gap-1.5 px-2 py-1 text-sm font-medium z-[1] flex-1 items-center justify-center text-nowrap whitespace-nowrap text-ppx-neutral-18 not-data-selected:hover:text-ppx-neutral-12 focus-visible:ring-[3px] data-selected:text-ppx-primary-b-5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function Indicator({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Indicator>) {
  const { variant } = useTabs();

  return (
    <BaseTabs.Indicator
      data-slot="tab-indicator"
      className={cn(
        "left-0 ease-in-out absolute w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 transition-all duration-300",
        variant === "underline"
          ? "top-full z-10 h-[2px] bg-ppx-primary-b-5"
          : "",
        className,
      )}
      {...props}
    />
  );
}

export function Content({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}
