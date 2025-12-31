import { AvatarGroup } from "@px-ui/core";

export function AvatarGroupBasicDemo() {
  const avatars = [
    {
      name: "Alice Johnson",
      imgSrc: "https://github.com/shadcn.png",
      size: "40px",
    },
    { name: "Bob Smith", imgSrc: null, size: "40px" },
    { name: "Carol Williams", imgSrc: null, size: "40px" },
    { name: "David Brown", imgSrc: null, size: "40px" },
  ];

  return <AvatarGroup avatars={avatars} />;
}
