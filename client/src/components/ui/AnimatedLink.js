import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

/**
 * 
 * @param {*} props - Expected props are a link/route and a title for the button 
 * @returns 
 */
export default function AnimatedLink(props) {
  return (
    <Link href={props.route}>
      <motion.button
        className={`m-5 border 
        bg-blue-500 p-2 rounded-md tracking-widest
         hover:bg-blue-700 text-white uppercase ${props.className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {props.icon ? props.icon : null}{props.title}
      </motion.button>
    </Link>
  );
}
