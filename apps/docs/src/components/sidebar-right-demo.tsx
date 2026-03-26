import { Sidebar } from "@px-ui/core";

export function SidebarRightDemo() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg border border-ppx-neutral-4 [transform:translateZ(0)]">
      <Sidebar.Provider>
        <Sidebar.Inset>
          <header className="flex h-12 items-center gap-2 border-b border-ppx-neutral-3 px-4">
            <span className="text-ppx-sm font-sans-sb">Right Sidebar</span>
            <div className="ml-auto">
              <Sidebar.Trigger />
            </div>
          </header>
          <div className="flex-1 p-4">
            <p className="text-ppx-sm text-ppx-muted-foreground">
              The sidebar is on the right side of the layout.
            </p>
          </div>
        </Sidebar.Inset>
        <Sidebar.Root side="right">
          <Sidebar.Header>
            <div className="flex items-center gap-2 px-2">
              <div className="flex size-8 items-center justify-center rounded-ppx-s bg-ppx-primary-5 text-white font-sans-sb text-ppx-sm">
                P
              </div>
              <span className="font-sans-sb text-ppx-sm">Details</span>
            </div>
          </Sidebar.Header>
          <Sidebar.Separator />
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Properties</Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton isActive>
                      <InfoIcon />
                      <span>Overview</span>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <ActivityIcon />
                      <span>Activity</span>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <HistoryIcon />
                      <span>History</span>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar.Root>
      </Sidebar.Provider>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
