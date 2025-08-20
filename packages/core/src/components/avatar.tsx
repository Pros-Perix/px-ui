import { Avatar as AvatarBase } from "@base-ui-components/react/avatar";
import { cn } from "../utils";
import { useMemo } from "react";
import * as Tooltip from "./tooltip";

type AvatarVariant = "squared" | "rounded";

const COLORS_PALETTE = [
  "#bdc3c7",
  "#6f7b87",
  "#2c3e50",
  "#2f3193",
  "#662d91",
  "#922790",
  "#ec2176",
  "#ed1c24",
  "#f36622",
  "#f8941e",
  "#fab70f",
  "#fdde00",
  "#d1d219",
  "#8ec73f",
  "#00a650",
  "#00aa9c",
  "#00adef",
  "#0081cd",
  "#005bab",
  "#012a4a",
  "#013a63",
  "#06d6a0",
  "#ef476f",
  "#ff5d8f",
  "#0496ff",
  "#c879ff",
];

const generateNameInitials = (name: string) => {
  if (!name.length) return "";
  const rgx = new RegExp(/(\b\w)/g);

  const initials = [...name.matchAll(rgx)];
  return (
    (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
  ).toUpperCase();
};

const getBgColorAndTextColor = (name: string | null | undefined) => {
  if (!name) return {};
  let index = name[0].toUpperCase().charCodeAt(0);

  const lastName = name.split(" ")[1];

  if (lastName) {
    index = index + lastName[0].toUpperCase().charCodeAt(0);
    index = Math.floor(index / 2);
  }

  index = Math.abs(index - 65);

  return {
    backgroundColor: COLORS_PALETTE[index],
    color: "#fff",
  };
};

const replaceSizeInUrl = (url: string, size: string) => {
  const numberSize = size.replace("px", "");
  const newSize = `${numberSize}x${numberSize}`;
  return url.replace("/SIZE/", `/${newSize}/`);
};

export function Avatar(props: {
  imgSrc: string | null | undefined;
  name: string | null | undefined;
  variant?: AvatarVariant;
  size?: `${number}px`;
  className?: string;
  children?: React.ReactNode;
  hideTooltip?: boolean;
}) {
  const { variant = "squared", size = "100px" } = props;
  const name = props.name ?? "";
  const nameInitial = useMemo(() => generateNameInitials(name), [name]);
  const colorStyle = useMemo(() => getBgColorAndTextColor(name), [name]);
  const sizeReplacedUrl = useMemo(
    () => (props.imgSrc ? replaceSizeInUrl(props.imgSrc, size) : undefined),
    [props.imgSrc, size],
  );

  return (
    <Tooltip.Root disabled={props.hideTooltip}>
      <Tooltip.Trigger
        render={(tooltipProps) => (
          <AvatarBase.Root
            data-slot="avatar"
            className={cn(
              "@container relative flex shrink-0 overflow-hidden",
              variant === "rounded" && "rounded-full",
              variant === "squared" && "rounded-ppx-s",
              props.className,
            )}
            style={{
              width: size,
              height: size,
            }}
            {...tooltipProps}
          >
            <AvatarBase.Image
              data-slot="avatar-image"
              className={"size-full object-cover"}
              src={sizeReplacedUrl}
            />

            <AvatarBase.Fallback
              data-slot="avatar-fallback"
              className={cn(
                "font-medium flex size-full items-center justify-center text-[40cqw] select-none",
              )}
              style={colorStyle}
            >
              {nameInitial}
            </AvatarBase.Fallback>

            {props.children}
          </AvatarBase.Root>
        )}
      />

      <Tooltip.Content>{props.name}</Tooltip.Content>
    </Tooltip.Root>
  );
}
