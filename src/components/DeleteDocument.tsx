"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { startTransition, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "../../actions/actions";
import { toast } from "sonner";

function DeleteDocument() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const router = useRouter();
  const handleDelete = async () => {


    const roomId = pathName.split("/").pop();

    if (!roomId) return;

      startTransition(async () => {
        const {success} = await deleteDocument(roomId);
        if (success) {
          router.replace("");
          setIsOpen(false);
          toast.success("Room Deleted Successfully");
        } else {
          toast.error("Error Deleting Room");
        }
      });
  };

  const [isPending] = useTransition();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="destructive">
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to Delete?</DialogTitle>
          <DialogDescription>
            This wil Delete the Document and all of its contents. removing all
            users from Document
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-2">
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            variant={"destructive"}
  
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>

          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Close{" "}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDocument;
