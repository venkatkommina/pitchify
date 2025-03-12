"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

const AuthButtons = ({ session }: { session: Session | null }) => {
  return (
    <>
      {session && session.user ? (
        <>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer max-xs:text-base"
          >
            Logout
          </button>

          <span className="max-xs:text-base">{session.user.name}</span>
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
