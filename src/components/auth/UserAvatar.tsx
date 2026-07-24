"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@//components/ui/avatar";

interface UserAvatarProps {
  user?: string | null;
  className?: string;
}

export default function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={user ?? ""} />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
}
