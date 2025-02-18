"use Client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { PointerEvent } from "react";
import FollowPointer from "./FollowPointer";

export default function LiveCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [myPresence, updateMyPresence] = useMyPresence();

  const others = useOthers();

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };

    updateMyPresence({ cursor });
  }

  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }
  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {others
        .filter((other) => other.presence.cursor)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x = {presence.cursor?.x ?? 0}
            y = {presence.cursor?.y ?? 0}
          ></FollowPointer>

        ))}
        {children}
    </div>
  );
}
