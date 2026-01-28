import { cn } from "../utils";

export default function TextFileIcon(props: React.ComponentProps<"svg">) {
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
        fill="#607D8B"
      />
      <path d="M14 2v6h6" fill="#CFD8DC" />
      <path
        d="M14 2v6h6"
        stroke="#607D8B"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 15h6M8 18h4"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
