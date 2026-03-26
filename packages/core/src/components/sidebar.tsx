"use client";

import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";

import { useIsMobile } from "../hooks/use-mobile";
import { cn } from "../utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import * as Tooltip from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((open) => !open)
      : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-ppx-neutral-2",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

// ---- Mobile Sheet (using Base UI Dialog as a sheet) ----

function MobileSheet({
  open,
  onOpenChange,
  side = "left",
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
        />
        <BaseDialog.Popup
          className={cn(
            "fixed inset-y-0 z-50 flex h-svh flex-col bg-ppx-background shadow-lg outline-none transition-transform duration-200",
            side === "left" &&
              "left-0 data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
            side === "right" &&
              "right-0 data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
          )}
        >
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

// ---- Sidebar ----

function SidebarRoot({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-ppx-background text-ppx-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <MobileSheet
        open={openMobile}
        onOpenChange={setOpenMobile}
        side={side}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-ppx-background text-ppx-foreground flex h-full w-full flex-col p-0"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              width: "var(--sidebar-width)",
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </MobileSheet>
    );
  }

  return (
    <div
      className="group peer hidden text-ppx-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          "data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
          "data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l border-ppx-border",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex size-full flex-col bg-ppx-background group-data-[variant=floating]:rounded-ppx-m group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-ppx-border"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ---- Sidebar Trigger ----

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

// Inline PanelLeft icon to avoid requiring lucide-react as a dependency
function PanelLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

// ---- Sidebar Rail ----

function SidebarRail({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear sm:flex",
        "hover:after:bg-ppx-neutral-5 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px]",
        "group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-ppx-neutral-2",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

// ---- Sidebar Inset ----

function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-ppx-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-ppx-m md:peer-data-[variant=inset]:shadow-sm",
        "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  );
}

// ---- Sidebar Input ----

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      size="sm"
      widthVariant="full"
      className={cn("bg-ppx-background shadow-none", className)}
      {...props}
    />
  );
}

// ---- Sidebar Header ----

function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

// ---- Sidebar Footer ----

function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

// ---- Sidebar Separator ----

function SidebarSeparator({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      orientation={orientation}
      className={cn("mx-2 w-auto bg-ppx-neutral-3", className)}
      {...props}
    />
  );
}

// ---- Sidebar Content ----

function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className,
      )}
      {...props}
    />
  );
}

// ---- Sidebar Group ----

function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

// ---- Sidebar Group Label ----

function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-ppx-s px-2 text-ppx-xs font-medium text-ppx-neutral-11 outline-none transition-[margin,opacity] duration-200 ease-linear",
        "focus-visible:ring-2 focus-visible:ring-ppx-primary-focus",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

// ---- Sidebar Group Action ----

function SidebarGroupAction({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-ppx-s p-0 text-ppx-neutral-11 outline-none transition-transform",
        "hover:bg-ppx-neutral-2 hover:text-ppx-foreground",
        "focus-visible:ring-2 focus-visible:ring-ppx-primary-focus",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:hidden",
        "after:absolute after:-inset-2 md:after:hidden",
        className,
      )}
      {...props}
    />
  );
}

// ---- Sidebar Group Content ----

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-ppx-sm", className)}
      {...props}
    />
  );
}

// ---- Sidebar Menu ----

function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      {...props}
    />
  );
}

// ---- Sidebar Menu Item ----

function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

// ---- Sidebar Menu Button ----

const sidebarMenuButtonVariants = cva(
  cn(
    "group/menu-button peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-ppx-s p-2 text-left text-ppx-sm outline-none transition-[width,height,padding]",
    "hover:bg-ppx-neutral-2 hover:text-ppx-foreground",
    "active:bg-ppx-neutral-3 active:text-ppx-foreground",
    "data-active:bg-ppx-neutral-2 data-active:text-ppx-foreground data-active:font-medium",
    "focus-visible:ring-2 focus-visible:ring-ppx-primary-focus",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "group-has-data-[sidebar=menu-action]/menu-item:pr-8",
    "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
    "[&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  ),
  {
    variants: {
      variant: {
        default:
          "hover:bg-ppx-neutral-2 hover:text-ppx-foreground",
        outline:
          "bg-ppx-background shadow-[0_0_0_1px_var(--color-ppx-neutral-4)] hover:bg-ppx-neutral-2 hover:text-ppx-foreground hover:shadow-[0_0_0_1px_var(--color-ppx-neutral-5)]",
      },
      size: {
        default: "h-8 text-ppx-sm",
        sm: "h-7 text-ppx-xs",
        lg: "h-12 text-ppx-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function SidebarMenuButton({
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof Tooltip.Content>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const { isMobile, state } = useSidebar();

  const button = (
    <button
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive || undefined}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );

  if (!tooltip) {
    return button;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger render={<button />} {...props}>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Content
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltipProps}
      />
    </Tooltip.Root>
  );
}

// ---- Sidebar Menu Action ----

function SidebarMenuAction({
  className,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  showOnHover?: boolean;
}) {
  return (
    <button
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-ppx-s p-0 text-ppx-neutral-11 outline-none transition-transform",
        "hover:bg-ppx-neutral-2 hover:text-ppx-foreground",
        "peer-hover/menu-button:text-ppx-foreground",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "peer-data-[size=sm]/menu-button:top-1",
        "focus-visible:ring-2 focus-visible:ring-ppx-primary-focus",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:hidden",
        "after:absolute after:-inset-2 md:after:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-ppx-foreground aria-expanded:opacity-100 md:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

// ---- Sidebar Menu Badge ----

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-ppx-s px-1 text-ppx-xs font-medium tabular-nums text-ppx-neutral-11",
        "peer-hover/menu-button:text-ppx-foreground",
        "peer-data-active/menu-button:text-ppx-foreground",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "peer-data-[size=sm]/menu-button:top-1",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

// ---- Sidebar Menu Skeleton ----

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-ppx-s px-2", className)}
      {...props}
    >
      {showIcon && (
        <div
          className="size-4 animate-pulse rounded-ppx-s bg-ppx-neutral-3"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <div
        className="h-4 max-w-(--skeleton-width) flex-1 animate-pulse rounded-ppx-s bg-ppx-neutral-3"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

// ---- Sidebar Menu Sub ----

function SidebarMenuSub({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-ppx-neutral-4 px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

// ---- Sidebar Menu Sub Item ----

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

// ---- Sidebar Menu Sub Button ----

function SidebarMenuSubButton({
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  size?: "sm" | "md";
  isActive?: boolean;
}) {
  return (
    <a
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive || undefined}
      className={cn(
        "flex min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-ppx-s px-2 outline-none",
        "h-7 text-ppx-foreground",
        "hover:bg-ppx-neutral-2 hover:text-ppx-foreground",
        "active:bg-ppx-neutral-3 active:text-ppx-foreground",
        "data-active:bg-ppx-neutral-2 data-active:text-ppx-foreground",
        "focus-visible:ring-2 focus-visible:ring-ppx-primary-focus",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-ppx-neutral-11",
        "[&>span:last-child]:truncate",
        "group-data-[collapsible=icon]:hidden",
        size === "sm" ? "text-ppx-xs" : "text-ppx-sm",
        className,
      )}
      {...props}
    />
  );
}

export {
  SidebarRoot as Root,
  SidebarContent as Content,
  SidebarFooter as Footer,
  SidebarGroup as Group,
  SidebarGroupAction as GroupAction,
  SidebarGroupContent as GroupContent,
  SidebarGroupLabel as GroupLabel,
  SidebarHeader as Header,
  SidebarInput as SidebarInput,
  SidebarInset as Inset,
  SidebarMenu as Menu,
  SidebarMenuAction as MenuAction,
  SidebarMenuBadge as MenuBadge,
  SidebarMenuButton as MenuButton,
  SidebarMenuItem as MenuItem,
  SidebarMenuSkeleton as MenuSkeleton,
  SidebarMenuSub as MenuSub,
  SidebarMenuSubButton as MenuSubButton,
  SidebarMenuSubItem as MenuSubItem,
  SidebarProvider as Provider,
  SidebarRail as Rail,
  SidebarSeparator as Separator,
  SidebarTrigger as Trigger,
  useSidebar,
};
