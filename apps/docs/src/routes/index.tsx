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
      <div className="flex flex-1 flex-col justify-center px-4 py-8 text-center">
        <h1 className="mb-4 text-xl font-medium">
          Fumadocs on Tanstack Start.
        </h1>
        <Link
          to="/docs/$"
          params={{
            _splat: "",
          }}
          className={buttonVariants({ className: "mx-auto w-fit" })}
        >
          Open Docs
        </Link>
      </div>
    </HomeLayout>
  );
}
