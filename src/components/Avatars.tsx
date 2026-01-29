import React from "react";
import {
  AvatarGroup,
  AvatarGroupCount,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./ui/avatar";

const Avatars = () => {
  return (
    <div className="flex gap-8 items-center justify-center">
      <h2 className="font-sans text-lg text-gray-600">Join us</h2>
      <AvatarGroup className="grayscale scale-125">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount className="font-sans text-xs bg-emerald-100 text-gray-600">
          +50K
        </AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
};

export default Avatars;
