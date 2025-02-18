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
import { FormEvent, startTransition, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {  inviteUserToDocument } from "../../actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [email, setEmail] = useState("");

  const router = useRouter();
  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();
    const roomId = pathName.split("/").pop();
    if (!roomId) return;

    startTransition(async () => {
      const { success } = await inviteUserToDocument(roomId,email);
      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("User Added Successfully");
      } else {
        toast.error("Failed to add");
      }
    });
  };

  const [isPending, setIsPending] = useTransition();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline" >
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter The Email Of user you want to invite</DialogTitle>
        </DialogHeader>
        <form  className="flex gap-2" onSubmit={handleInvite}>
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Button type="submit" disabled={!email  || isPending} >
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUser;
