"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  name: string | undefined | null;
}
const UserAvatar = ({ name }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src="" alt="avatar" />
      <AvatarFallback>{name?.toUpperCase().slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
