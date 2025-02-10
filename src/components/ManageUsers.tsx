"use client";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { startTransition, useState, useTransition } from "react";
// import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "sonner";
import { removeUserFromDocument } from "../../actions/actions";

function ManageUsers() {
  const { user } = useUser();
  const isOwner = useOwner();
  const room = useRoom();
  const [isOpen, setIsOpen] = useState(false);
  // const pathName = usePathname();
  // const [email, setEmail] = useState("");

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  // const router = useRouter();
  const handleDeleteUsers = (userId: string) => {
    startTransition(async () => {
      if (!user) return;
      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success("user removed successfully!");
      } else {
        toast.error("Failed to remove user from room");
      }
    });
  };

  const [isPending, setIsPending] = useTransition();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Users ({usersInRoom?.docs.length}) </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with access</DialogTitle>
          <DialogDescription>
            Below Is a list of users with access to this document
          </DialogDescription>
        </DialogHeader>

        <hr className="my-2" />

        <div className="my-2">
          {usersInRoom?.docs.map((doc) => (
            <div
              key={doc.data().userId}
              className="flex justify-between items-center"
            >
              <p className="font-light">
                {doc.data().userId === user?.emailAddresses[0].toString()
                  ? `You (${doc.data().userID})`
                  : doc.data().userId}
              </p>
              <div className="flex intems-center gap-2">
                <Button variant="outline">{doc.data().role}</Button>

                {isOwner &&
                  doc.data().userId !== user?.emailAddresses[0].toString() && 
                    <Button
                      onClick={() => handleDeleteUsers(doc.data().userId)}
                      variant="destructive"
                      size="sm"
                      disabled={isPending}
                    >
                      {isPending ? "Removing..." : "X"}
                    </Button>
                 }
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ManageUsers;
