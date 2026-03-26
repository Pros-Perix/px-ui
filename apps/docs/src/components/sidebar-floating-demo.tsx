import { Sidebar } from "@px-ui/core";

export function SidebarFloatingDemo() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg border border-ppx-neutral-4 [transform:translateZ(0)]">
      <Sidebar.Provider>
        <Sidebar.Root variant="floating">
          <Sidebar.Header>
            <div className="flex items-center gap-2 px-2">
              <div className="flex size-8 items-center justify-center rounded-ppx-s bg-ppx-primary-5 text-white font-sans-sb text-ppx-sm">
                P
              </div>
              <span className="font-sans-sb text-ppx-sm">PX Platform</span>
            </div>
          </Sidebar.Header>
          <Sidebar.Separator />
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton isActive>
                      <HomeIcon />
                      <span>Dashboard</span>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <InboxIcon />
                      <span>Inbox</span>
                      <Sidebar.MenuBadge>12</Sidebar.MenuBadge>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <CalendarIcon />
                      <span>Calendar</span>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar.Root>
        <Sidebar.Inset>
          <header className="flex h-12 items-center gap-2 border-b border-ppx-neutral-3 px-4">
            <Sidebar.Trigger />
            <span className="text-ppx-sm font-sans-sb">Floating Variant</span>
          </header>
          <div className="flex-1 p-4">
            <p className="text-ppx-sm text-ppx-muted-foreground">
              The floating variant adds a rounded border and shadow to the sidebar.
            </p>
          </div>
        </Sidebar.Inset>
      </Sidebar.Provider>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
