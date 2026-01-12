import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils/classnames"

const otpInputSlotVariants = cva(
  "shadow-xs inline-flex border-ppx-neutral-5 bg-ppx-neutral-1 text-ppx-foreground outline-transparent focus:-outline-offset-1 focus:outline-2 focus:not-aria-invalid:outline-ppx-primary-focus focus:not-aria-invalid:not-aria-disabled:bg-ppx-background focus:not-aria-invalid:bg-white disabled:cursor-not-allowed disabled:border-ppx-neutral-3 disabled:bg-ppx-neutral-3 disabled:text-ppx-neutral-11 aria-invalid:outline-ppx-red-4 aria-invalid:bg-ppx-red-1 aria-invalid:outline aria-invalid:-outline-offset-1 relative flex items-center justify-center border-y border-r transition-all first:border-l data-[active=true]:z-10 data-[active=true]:outline-ppx-primary-focus data-[active=true]:outline data-[active=true]:-outline-offset-1 data-[active=true]:bg-white data-[active=true]:aria-invalid:outline-ppx-red-4 data-[active=true]:aria-invalid:bg-ppx-red-1",
  {
    variants: {
      size: {
        default: "h-[70px] w-[62.22222137451172px] first:rounded-l last:rounded-r font-sans font-medium text-[30px] leading-none tracking-normal align-middle",
        sm: "h-input-s w-8 first:rounded-l-input-s last:rounded-r-input-s font-medium text-ppx-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

// Internal helper components (not exported, used only by OtpInput)
function OtpInputGroup({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function OtpInputSlot({
  index,
  className,
  size,
  ...props
}: Readonly<
  React.ComponentProps<"div"> & {
    index: number
    size?: VariantProps<typeof otpInputSlotVariants>["size"]
  }
>) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(otpInputSlotVariants({ size }), className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-ppx-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function OtpInputSeparator({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="input-otp-separator"
      className={cn("flex items-center", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
      </svg>
    </div>
  )
}

// Prop config derived out of OTPInput component and some more
interface OtpInputProps
  extends Readonly<
    Omit<React.ComponentProps<typeof OTPInput>, "children" | "render" | "maxLength" | "size">
  > {
  
  length?: number
  maxLength?: number
  separatorAfter?: number[]
  invalid?: boolean
  containerClassName?: string
  slotClassName?: string
  separatorClassName?: string
  size?: VariantProps<typeof otpInputSlotVariants>["size"]
}

function OtpInput({
  length = 6,
  separatorAfter = [],
  className,
  containerClassName,
  slotClassName,
  separatorClassName,
  maxLength,
  invalid,
  size = "default",
  "aria-invalid": ariaInvalid,
  ...props
}: Readonly<OtpInputProps>) {
  const otpLength = maxLength ?? length
  const slots = Array.from({ length: otpLength }, (_, i) => i)
  const separatorPositions = new Set(separatorAfter)
  const isInvalid = invalid ?? ariaInvalid ?? undefined

  return (
    <OTPInput
      data-slot="input-otp"
      maxLength={otpLength}
      aria-invalid={isInvalid}
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    >
      {slots.map((index) => {
        const shouldAddSeparator = separatorPositions.has(index - 1) && index > 0

        return (
          <React.Fragment key={index}>
            {shouldAddSeparator && (
              <OtpInputSeparator className={separatorClassName} />
            )}
            <OtpInputGroup>
              <OtpInputSlot
                index={index}
                className={slotClassName}
                aria-invalid={isInvalid}
                size={size}
              />
            </OtpInputGroup>
          </React.Fragment>
        )
      })}
    </OTPInput>
  )
}

export { OtpInput }
