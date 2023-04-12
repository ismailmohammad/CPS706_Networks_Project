import React from "react";
import Head from "next/head";
import Header from "../components/Header.js";
import Link from "next/link";
import { motion } from "framer-motion";

export default function decentralized() {
  return (
    <div>
      <Head>
        <title>CPS706 Project</title>
      </Head>
      <Header />
      <div className="text-center m-5">
        <section>
          <h1 className="tracking-widest uppercase m-5 text-xl font-bold">
            Decentralized Routing Algorithm
          </h1>
          <p>
            A decentralized routing algorithm works by trying to find the least
            cost path between a source and destination node but without knowing
            about every router in a network. Since each node doesn’t have a
            complete picture of the network it gets information from its
            neighboring nodes that it is directly connected to. It can then
            perform a distance calculation (distance vector) from its node with
            information provided by its neighbor. Once a distance vector is
            updated this information is again sent to neighboring nodes. This
            way a least cost path can iteratively be built up all the way to a
            destination node. A technique that uses the notion of distance
            vectors is Bellman-Ford. Here is an example.
            <br />
            <br />
            Using the simple network below, we work to find the least cost past
            from node “A” to “D”:
          </p>
          <figure className="m-5">
            <img
              className="m-auto mt-5 mb-5 w-[700px]"
              src="./images/decentralizedp1.png"
              alt="p1"
            />
            <figcaption className="font-bold">
              Figure 1: Simple network graph with nodes: A, B, C, and D.
            </figcaption>
          </figure>
          <p>
            At time 0 “A” starts with a distance vector shown below, because it
            estimates the distance to its direct neighbors which are “B” and
            “C”.
          </p>
          <figure className="m-5">
            <img
              className="m-auto mt-5 mb-5 w-[700px]"
              src="./images/dvA.png"
              alt="distance vector A"
            />
            <figcaption className="font-bold">
              Figure 2: Distance vectors in relation to router A.
            </figcaption>
          </figure>
          <p>
            At time 1 “A” receives distance vectors from its direct neighbor’s
            “B” and “C” whose tables look like so:
          </p>
          <figure className="m-5">
            <img
              className="m-auto mt-5 mb-5 w-[700px]"
              src="./images/dvBC.png"
              alt="Distance vectors for B and C"
            />
            <figcaption className="font-bold">
              Figure 3: Distance vectors in relation to routers B and C.
            </figcaption>
          </figure>
          <p>
            Now “A” can do a Bellman-Ford calculation with this new information
            to find the distance to “D”.
          </p>
          <figure className="m-5">
            <img
              className="m-auto mt-5 mb-5 w-[700px]"
              src="./images/belmanford.png"
              alt="Belman Ford"
            />
            <figcaption className="font-bold">
              Figure 4: Calculating routes using updated distance vector tables.
            </figcaption>
          </figure>
          <p>
            Therefore, we find the minimum distance from node “A” to “D” is 3.
          </p>
        </section>
        <motion.div
          animate={{ x: [100, 0] }}
          transition={{ type: "spring", stiffness: 100 }}
          className=""
        >
          <Link href="/centralized">
            <motion.button
              className="m-5 border
         bg-blue-500 p-2 rounded-xl tracking-widest
          hover:bg-blue-700 text-white uppercase"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Centralized
            </motion.button>
          </Link>
          <Link href="/">
            <motion.button
              className="m-5 border 
        bg-blue-500 p-2 rounded-xl tracking-widest
         hover:bg-blue-700 text-white uppercase"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
