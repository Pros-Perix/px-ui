import { cn } from "../utils";

export default function WordIcon(props: React.ComponentProps<"svg">) {
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
        fill="#1976D2"
      />
      <path d="M14 2v6h6" fill="#BBDEFB" />
      <path
        d="M14 2v6h6"
        stroke="#1976D2"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="5"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        DOC
      </text>
    </svg>
  );
}
