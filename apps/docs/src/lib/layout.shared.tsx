import PpxLogo from "@/assets/ppx-colored-logo";
import { linkOptions } from "@tanstack/react-router";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  const linkConfig = linkOptions({ to: "/llms-full.txt" });

  return {
    nav: {
      title: (
        <div className="flex items-center gap-2.5">
          <PpxLogo className="size-7" />
          PX-UI
        </div>
      ),
    },
    links: [
      {
        type: "main",
        text: "llms-full.txt",
        url: linkConfig.to,
        external: true,
      },
    ],
    themeSwitch: { enabled: false },
    githubUrl: "https://github.com/Pros-Perix/px-ui",
  };
}
