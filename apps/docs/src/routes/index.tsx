import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { buttonVariants } from "@px-ui/core";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()} themeSwitch={{ enabled: false }}>
      <div className="-mt-40 flex flex-1 flex-col items-center justify-center px-4 py-16">
        <h1 className="text-ppx-h1 font-sans-b text-ppx-foreground mb-4">
          PX-UI
        </h1>
        <p className="text-ppx-base text-ppx-muted-foreground mb-8 max-w-md text-center">
          A modern React component library built on Base UI
        </p>
        <div className="flex gap-4">
          <Link
            className={buttonVariants({ size: "lg", variant: "primary" })}
            to="/docs/$"
            params={{ _splat: "getting-started" }}
          >
            Get Started
          </Link>
          <Link
            to="/docs/$"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "px-3!",
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
