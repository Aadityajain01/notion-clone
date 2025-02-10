"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { create } from "domain";

export async function createNewDocument() {
  auth();
  const authData = await auth();
  console.log("Auth Data:", authData);

  const { sessionClaims, userId } = await auth();

  const userEmail = (sessionClaims?.email as string) || (userId as string);

  if (!userEmail) {
    throw new Error("User authentication Failed");
  }

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "new document",
  });

  await adminDb
    .collection("users")
    .doc(userEmail)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  auth();
  console.log("delete document", roomId);

  //delete the document refrence
  try {
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();
    //delete the room refrence from users collections for every user in the room
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    return {success : true}

    // // delete the room from liveblocks
    // await liveblocks.deleteRoom(roomId);
  } catch (e) {
    console.log(
      "Error deleting document:",
      e instanceof Error ? e.message : String(e)
    );
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId: string, email: string) {
  auth();
  console.log("invite user to document", roomId, email);
  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId: roomId,
      });
    return { success: true };
  } catch (error) {
    console.log(
      "Error inviting user to document:",
      error instanceof Error ? error : String(error)
    );
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth();

  console.log("RemoveUserFromDocument", roomId, email);

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
