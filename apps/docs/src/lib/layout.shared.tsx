import PpxLogo from "@/assets/ppx-colored-logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2.5">
          <PpxLogo className="size-7" />
          PX-UI
        </div>
      ),
    },
    themeSwitch: { enabled: false },
    githubUrl: "https://github.com/Pros-Perix/px-ui",
  };
}
