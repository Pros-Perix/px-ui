import { OtpInput, OTPInput, OTPInputContext } from "@px-ui/core";
import * as React from "react";


function OtpInputGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={`flex items-center ${className || ""}`} {...props} />
  );
}

function OtpInputSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-active={isActive}
      className={`data-[active=true]:border-ring data-[active=true]:ring-ring/50 aria-invalid:border-destructive border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px] ${className || ""}`}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function OtpInputSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={`flex items-center ${className || ""}`} {...props}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <path
          d="M2 6h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function OtpInputDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Basic OTP */}
      <div className="flex flex-col gap-2">
        <OtpInput length={6} />
        <span className="text-ppx-neutral-11 text-xs">
          Prop-config-driven: 6-digit OTP
        </span>
      </div>

      {/* OTP with separator */}
      <div className="flex flex-col gap-2">
        <OtpInput length={6} separatorAfter={[2]} />
        <span className="text-ppx-neutral-11 text-xs">
          Prop-config-driven: With separator after 3rd digit
        </span>
      </div>

      {/* 4-digit PIN */}
      <div className="flex flex-col gap-2">
        <OtpInput length={4} />
        <span className="text-ppx-neutral-11 text-xs">
          Prop-config-driven: 4-digit PIN
        </span>
      </div>

      {/* Invalid state */}
      <div className="flex flex-col gap-2">
        <OtpInput length={6} invalid />
        <span className="text-ppx-neutral-11 text-xs">
          Prop-config-driven: Invalid state
        </span>
      </div>

      {/* Disabled state */}
      <div className="flex flex-col gap-2">
        <OtpInput length={6} disabled />
        <span className="text-ppx-neutral-11 text-xs">
          Prop-config-driven: Disabled
        </span>
      </div>

      {/* Basic OTP (composable) */}
      <div className="flex flex-col gap-2">
        <OTPInput maxLength={6}>
          <OtpInputGroup>
            <OtpInputSlot index={0} />
            <OtpInputSlot index={1} />
            <OtpInputSlot index={2} />
            <OtpInputSlot index={3} />
            <OtpInputSlot index={4} />
            <OtpInputSlot index={5} />
          </OtpInputGroup>
        </OTPInput>
        <span className="text-ppx-neutral-11 text-xs">
          Composable: 6-digit OTP (using input-otp directly)
        </span>
      </div>

      {/* OTP with separator (composable) */}
      <div className="flex flex-col gap-2">
        <OTPInput maxLength={6}>
          <OtpInputGroup>
            <OtpInputSlot index={0} />
            <OtpInputSlot index={1} />
            <OtpInputSlot index={2} />
          </OtpInputGroup>
          <OtpInputSeparator />
          <OtpInputGroup>
            <OtpInputSlot index={3} />
            <OtpInputSlot index={4} />
            <OtpInputSlot index={5} />
          </OtpInputGroup>
        </OTPInput>
        <span className="text-ppx-neutral-11 text-xs">
          Composable: With separator
        </span>
      </div>
    </div>
  );
}
