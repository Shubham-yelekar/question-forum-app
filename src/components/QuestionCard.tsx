import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { FlameIcon } from "lucide-react";

const QuestionCard = ({ questionData }: { questionData: any }) => {
  return (
    <Link href={`/question/${questionData.id}`}>
      <div className="border-b-1  transition p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-1">How to centre a div ? </h2>

        {/* Description */}
        <p className="text-sm text-secondary line-clamp-2 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt
        </p>
        {
          <Image
            src={"/image-components.jpg"}
            alt="post-image"
            width={400}
            height={300}
            className="w-full rounded-xl aspect-video object-cover"
          />
        }
        <div className="flex justify-between items-center mt-2">
          {/* Footer */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={questionData.userAvatar} />
              <AvatarFallback>{questionData.username?.[0]}</AvatarFallback>
            </Avatar>
            <h5 className="text-sm font-medium">Shubham</h5>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FlameIcon className="text-orange-500 fill-orange-400" /> 424
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
