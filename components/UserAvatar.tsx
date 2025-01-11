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
      <AvatarFallback>{name?.toUpperCase().slice(0)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
