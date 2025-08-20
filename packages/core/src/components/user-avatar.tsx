import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function UserAvatar({
  user,
}: {
  user: { name: string; image: string };
}) {
  return (
    <Avatar>
      <AvatarImage src={user.image} />
    </Avatar>
  );
}
