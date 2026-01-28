import { cn } from "../utils";

export default function ImageFileIcon(props: React.ComponentProps<"svg">) {
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
        fill="#7B1FA2"
      />
      <path d="M14 2v6h6" fill="#E1BEE7" />
      <path
        d="M14 2v6h6"
        stroke="#7B1FA2"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="13" r="1.5" fill="white" />
      <path
        d="M17 18H7l3-4 2 2 3-4 2 3"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
