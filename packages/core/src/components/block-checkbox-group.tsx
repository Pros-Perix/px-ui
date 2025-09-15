import { cn } from "../utils";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { Checkbox } from "./checkbox";

export function Group({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckboxGroup>) {
  return (
    <BaseCheckboxGroup className={cn("gap-4 flex", className)} {...props} />
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
        "gap-2 p-5 flex min-h-[155px] justify-between rounded-ppx-s border-2 border-ppx-neutral-3 shadow-[0px_0px_12px_#0000001F] transition-colors duration-300 has-not-disabled:hover:border-ppx-neutral-6 has-disabled:cursor-not-allowed has-disabled:opacity-60 has-disabled:hover:border-ppx-neutral-3 has-aria-invalid:shadow-ppx-red-2 has-data-checked:border-ppx-primary-5!",
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
    <div className={cn("mb-5 gap-2 flex items-center", props.className)}>
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
        "mb-5 text-ppx-sm text-ppx-muted-foreground",
        props.className,
      )}
    >
      {props.children}
    </p>
  );
}
