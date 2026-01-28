import { cn } from "../utils";

export default function GenericFileIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      className={cn("shrink-0", props.className)}
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        fill="#9E9E9E"
      />
      <path d="M14 2v6h6" fill="#E0E0E0" />
      <path
        d="M14 2v6h6"
        stroke="#9E9E9E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
