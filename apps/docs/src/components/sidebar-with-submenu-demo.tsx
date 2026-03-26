import * as React from "react";
import { Sidebar, Collapsible } from "@px-ui/core";

export function SidebarWithSubmenuDemo() {
  return (
    <div className="h-[450px] w-full overflow-hidden rounded-lg border border-ppx-neutral-4 [transform:translateZ(0)]">
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
              <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton isActive>
                      <HomeIcon />
                      <span>Dashboard</span>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>

                  {/* Collapsible submenu */}
                  <Collapsible.Root defaultOpen>
                    <Sidebar.MenuItem>
                      <Collapsible.Trigger
                        className="flex w-full items-center"
                      >
                        <Sidebar.MenuButton className="w-full">
                          <SettingsIcon />
                          <span>Settings</span>
                          <ChevronIcon className="ml-auto transition-transform group-data-[panel-open]:rotate-90" />
                        </Sidebar.MenuButton>
                      </Collapsible.Trigger>
                      <Collapsible.Panel>
                        <Sidebar.MenuSub>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton href="#">
                              <span>General</span>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton href="#" isActive>
                              <span>Security</span>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton href="#">
                              <span>Notifications</span>
                            </Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                        </Sidebar.MenuSub>
                      </Collapsible.Panel>
                    </Sidebar.MenuItem>
                  </Collapsible.Root>

                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <UsersIcon />
                      <span>Team</span>
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
            <span className="text-ppx-sm font-sans-sb">With Submenu</span>
          </header>
          <div className="flex-1 p-4">
            <p className="text-ppx-sm text-ppx-muted-foreground">
              Use Collapsible with MenuSub for nested navigation.
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

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
