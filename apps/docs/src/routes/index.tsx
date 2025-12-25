import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { buttonVariants, toast } from "@px-ui/core";
import PpxLogo from "@/assets/ppx-colored-logo";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()} themeSwitch={{ enabled: false }}>
      <div className="mt-40 flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="mb-4 flex items-center gap-3">
          <PpxLogo className="size-10" />
          <h1 className="text-ppx-h1 font-sans-b text-ppx-foreground">PX-UI</h1>

          <button
            onClick={() => {
              toast.add({
                title: "Success",
                description: "Job added successfully",
              });
            }}
          >
            show taost
          </button>
        </div>
        <p className="text-ppx-base text-ppx-muted-foreground mb-8 max-w-md text-center">
          A modern, accessible, TypeScript‑first React component library built
          for enterprise web apps.
        </p>
        <div className="flex gap-2">
          <Link
            className={buttonVariants({ variant: "primary" })}
            to="/docs/$"
            params={{ _splat: "getting-started" }}
          >
            Get Started
          </Link>
          <Link
            to="/docs/$"
            className={buttonVariants({
              variant: "ghost",
            })}
            params={{ _splat: "components/button" }}
          >
            Browse Components
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}
