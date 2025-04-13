"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

const AuthButtons = ({ session }: { session: Session | null }) => {
  return (
    <>
      {session && session.id ? (
        <>
          <button onClick={() => signOut()}>
            <span className="max-sm:hidden">Logout</span>
            <LogOut className="size-6 sm:hidden text-red-500" />
          </button>

          <Link href={`/user/${session?.id}`}>
            <Avatar className="size-10">
              <AvatarImage
                src={session?.user?.image}
                alt={session?.user?.name}
              />
            </Avatar>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={() => signIn("github")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Sign In
          </button>
        </>
      )}
    </>
  );
};

export default AuthButtons;
