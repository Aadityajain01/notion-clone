import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

interface DocLayoutProps {
  children: ReactNode;
  params: { id: string };
}

export default function DocLayout({ children, params }: DocLayoutProps) {
  const { id } = params; // Removed "await" here

  auth();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

