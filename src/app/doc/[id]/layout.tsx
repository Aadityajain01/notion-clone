import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

import { ReactNode } from "react";

interface DocLayoutProps {
    children: ReactNode;
    params: { id: string };
}

export default async function DocLayout({ children, params }: DocLayoutProps) {
    const {id } =  await params;

    auth();

    return <RoomProvider roomId={id}>{children} </RoomProvider>;

}
