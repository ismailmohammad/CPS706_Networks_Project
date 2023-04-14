import Link from "next/link";
import React from "react";
import AnimatedLink from "../ui/AnimatedLink";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function Header(props) {
  return (
    <Link href="/">
      <div
        className="p-[50px] bg-blue-500 text-center uppercase 
      tracking-widest font-bold text-2xl font-sans text-white"
      >
        {props.route !== "/" ? <AnimatedLink className="left-0" route="/" title="Home" alt="Home" /> : null}
        <span>CPS706 - Computer Networking: Final Project</span>
      </div>
    </Link>
  );
}



