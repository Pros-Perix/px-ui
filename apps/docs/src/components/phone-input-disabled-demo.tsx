import { PhoneInput } from "@px-ui/forms";

export default function PhoneInputDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <PhoneInput value="+14155552671" onChange={() => {}} disabled />
    </div>
  );
}
