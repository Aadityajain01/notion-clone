"use client";
import {
  startTransition,
  useState,
  useTransition,
  FormEvent,
  useEffect,
  Fragment,
} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { title } from "process";
import { db } from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

function Document({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const [isUpdating, setIsUpdating] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };
  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto justify- between p-5">
        <form className="flex  flex-1 space-x-2  " onSubmit={updateTitle}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Document title"
          />

          <Button disabled={isUpdating} type="submit">
            {" "}
            {isUpdating ? "Updating..." : "Update"}{" "}
          </Button>
          {/* update title */}

          {/* if     */}
          {isOwner && (
            <>
              {/* invite user */}

              {/* delete document */}
              <InviteUser />
              <DeleteDocument></DeleteDocument>
            </>
          )}

          {/* isOwner or inviteUser, deleteDocument */}
        </form>
      </div>

      {/* editor  */}
      <div className="flex max-w-6xl mx-auto justify-between p-5 gap-2">
        {/* manage users  */}
        <ManageUsers />
        <Avatars />
        {/* avatars  */}
      </div>

      <Editor></Editor>

      {/* {collaborative editor} */}
    </div>
  );
}

export default Document;
