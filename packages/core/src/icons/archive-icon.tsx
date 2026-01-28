import { cn } from "../utils";

export default function ArchiveIcon(props: React.ComponentProps<"svg">) {
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
        fill="#795548"
      />
      <path d="M14 2v6h6" fill="#D7CCC8" />
      <path
        d="M14 2v6h6"
        stroke="#795548"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="9" y="11" width="2" height="2" fill="white" />
      <rect x="11" y="13" width="2" height="2" fill="white" />
      <rect x="9" y="15" width="2" height="2" fill="white" />
      <rect x="11" y="17" width="2" height="2" fill="white" />
    </svg>
  );
}
