import { useMemo } from "react";
import {
  cn,
  cva,
  VariantProps,
  Label as LabelPrimitive,
  Separator as SeperatorPrimitive,
} from "@px-ui/core";

export function Set({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "gap-6 flex flex-col",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  );
}

export function Legend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function Group({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4 @container/field-group flex w-full flex-col",
        className,
      )}
      {...props}
    />
  );
}

type FieldVariantsType = (
  props?:
    | {
        orientation?: "vertical" | "horizontal" | "responsive";
      }
    | undefined,
) => string;

const fieldVariants: FieldVariantsType = cva(
  "group/field flex w-full gap-1.5 data-[invalid=true]:text-ppx-red-5",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
) as FieldVariantsType;

export function Root({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

export function Content({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content gap-1.5 leading-snug flex flex-1 flex-col",
        className,
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive>) {
  return (
    <LabelPrimitive
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label gap-2 leading-snug flex w-fit group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:rounded-md [&>*]:data-[slot=field]:p-4 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:border",
        className,
      )}
      {...props}
    />
  );
}

export function Title({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "gap-2 leading-snug font-medium flex w-fit items-center text-ppx-sm group-data-[disabled=true]/field:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function Description({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "leading-normal font-normal text-ppx-sm text-ppx-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        className,
      )}
      {...props}
    />
  );
}

export function Separator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "-my-2 h-5 group-data-[variant=outline]/field-group:-mb-2 relative text-ppx-sm",
        className,
      )}
      {...props}
    >
      <SeperatorPrimitive
        orientation="horizontal"
        className="inset-0 absolute top-1/2"
      />
      {children && (
        <span
          className="px-2 relative mx-auto block w-fit bg-ppx-background text-ppx-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
}

export function Error({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 gap-1 flex list-disc flex-col">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("font-normal text-ppx-sm text-ppx-red-5", className)}
      {...props}
    >
      {content}
    </div>
  );
}
