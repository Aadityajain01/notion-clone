"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs"
import Breadcrumbs from "./Breadcrumbs";


export default function Header() {
  const {user} = useUser();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100"> 
      {user && (
        <h1>{user?.firstName}
        {"'s"} Space
        </h1> )}


        {/* {breadcrumbs} */}
        <Breadcrumbs/>

        <div>
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>
        </div>
    </div>
  )
}
