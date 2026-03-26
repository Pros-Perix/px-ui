import { Sidebar } from "@px-ui/core";

export function SidebarWithBadgeDemo() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg border border-ppx-neutral-4 [transform:translateZ(0)]">
      <Sidebar.Provider>
        <Sidebar.Root>
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
              <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
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
                    </Sidebar.MenuButton>
                    <Sidebar.MenuBadge>24</Sidebar.MenuBadge>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <AlertIcon />
                      <span>Issues</span>
                    </Sidebar.MenuButton>
                    <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <TaskIcon />
                      <span>Tasks</span>
                    </Sidebar.MenuButton>
                    <Sidebar.MenuBadge>128</Sidebar.MenuBadge>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar.Root>
        <Sidebar.Inset>
          <header className="flex h-12 items-center gap-2 border-b border-ppx-neutral-3 px-4">
            <Sidebar.Trigger />
            <span className="text-ppx-sm font-sans-sb">With Badges</span>
          </header>
          <div className="flex-1 p-4">
            <p className="text-ppx-sm text-ppx-muted-foreground">
              Use MenuBadge to show counts or status indicators.
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

function AlertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function TaskIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}
