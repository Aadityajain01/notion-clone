"use client";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Avatars = () => {
  const others = useOthers();
  const self = useSelf();
  const all = [self, ...others];

  return (
    <div className="flex items-center ">
      <p className="font-light text-sm">
        users currenlty in the room
        <div className="flex -space-x-5">
          {all.map((other, i) => (
            <TooltipProvider key={other?.id + i}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="relative">
                    <Avatar className="border-2">
                      <AvatarImage src={other?.info.avatar} />
                      <AvatarFallback> {other?.info.name} </AvatarFallback>
                    </Avatar>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{self.id === other?.id ? "you" : other?.info.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </p>
    </div>
  );
};

export default Avatars;
