"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  name: string | undefined | null;
  image: string | undefined | null;
}
const UserAvatar = ({ name, image }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={image ?? undefined} alt="avatar" />
      <AvatarFallback className="bg-primary/10">
        {name?.toUpperCase().slice(0, 1)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
