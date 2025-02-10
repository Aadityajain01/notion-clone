"use server";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";

export async function POST(req: NextRequest) {
  auth();
  const { sessionClaims } = await auth();
  const { room } = await req.json();

  const session = liveblocks.prepareSession(sessionClaims?.email as string, {
    userInfo: {
      email: sessionClaims?.email as string,
      name: sessionClaims?.fullName as string,
      avatar: sessionClaims?.image as string,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);
  if(userInRoom?.exists){
    session.allow(room,session.FULL_ACCESS);
    const {body,status} = await session.authorize();
    console.log("you are authorised to access this room");
    
    return new Response(body, { status });
  }
  else { 
    return NextResponse.json({error: "you are not in this room"}, {status: 403});
  }
}
