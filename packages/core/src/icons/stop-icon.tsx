import { cn } from "../utils";

export default function StopIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
      className={cn("shrink-0", props.className)}
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

