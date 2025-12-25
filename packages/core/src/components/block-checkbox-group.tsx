import { cn } from "../utils";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { Checkbox } from "./checkbox";

export function Group({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckboxGroup>) {
  return (
    <BaseCheckboxGroup className={cn("flex gap-4", className)} {...props} />
  );
}

export function Item({
  className,
  invalid,
  children,
  ...rest
}: React.PropsWithChildren<React.ComponentProps<typeof Checkbox>> & {
  className?: string;
  invalid?: boolean;
}) {
  return (
    <label
      className={cn(
        "rounded-ppx-s border-ppx-neutral-3 has-not-data-disabled:hover:border-ppx-neutral-6 has-data-disabled:cursor-not-allowed has-data-disabled:opacity-60 has-data-disabled:hover:border-ppx-neutral-3 has-aria-invalid:shadow-ppx-red-2 has-data-checked:border-ppx-primary-5! flex min-h-[155px] justify-between gap-2 border-2 p-5 shadow-[0px_0px_12px_#0000001F] transition-colors duration-300",
        className,
      )}
    >
      <div className="flex-1">{children}</div>
      <Checkbox
        {...rest}
        className={"ml-auto shrink-0 self-start"}
        size="lg"
        aria-invalid={invalid}
      />
    </label>
  );
}

export function Header(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mb-5 flex items-center gap-2", props.className)}>
      {props.children}
    </div>
  );
}

export function Title(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "font-sans-sb text-ppx-base text-ppx-foreground",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

export function Description(
  props: React.PropsWithChildren<{ className?: string }>,
) {
  return (
    <p
      className={cn(
        "text-ppx-sm text-ppx-muted-foreground mb-5",
        props.className,
      )}
    >
      {props.children}
    </p>
  );
}
