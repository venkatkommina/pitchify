import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButton";
import { Session } from "next-auth";

const Navbar = async () => {
  const session: Session | null = await auth();
  return (
    <div className="text-2xl font-semibold px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="max-xs:w-3/4">
          <Image
            src="/pitchify_logo.png"
            alt="Pitchify Logo"
            width={144}
            height={30}
          />
        </Link>

        <div className="flex items-center gap-5 text-black">
          <Link href="/startup/create">
            <span className="max-sm:hidden">Create</span>
          </Link>

          <AuthButtons session={session} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
