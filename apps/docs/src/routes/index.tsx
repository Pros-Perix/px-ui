import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { buttonVariants } from "@px-ui/core";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="mt-20 flex flex-col items-center">
        <h1 className="text-ppx-h1 font-sans-sb mb-8">
          PX-UI Component Library
        </h1>
        <div>
          <Link
            to="/docs/$"
            params={{
              _splat: "",
            }}
            className={buttonVariants({ variant: "primary" })}
          >
            View Docs
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}
