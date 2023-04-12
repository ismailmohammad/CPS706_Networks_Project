import React from "react";
import Head from "next/head";
import Header from "../components/Header.js";
import { motion } from "framer-motion";
import Link from "next/link";

export default function centralized() {
  return (
    <div>
      <Head>
        <title>CPS706 Project</title>
      </Head>
      <Header />
      <div className="text-center m-5">
        <section className="">
          <h1 className="tracking-widest uppercase m-5 text-xl font-bold">
            Centralized Routing Algorithm
          </h1>

          <figure className="m-5">
            <img
              className="m-auto mt-5 mb-5 w-[700px] rounded-3xl drop-shadow"
              src="./images/pseudocode.png"
              alt="pseudocode"
            />
            <figcaption className="font-bold">
              Figure 1: Link-state routing pseudocode, retrieved from{" "}
              <i>Computer Networking: A Top-Down Approach </i> by Jim Kurose and
              Keith Ross.
            </figcaption>
          </figure>
          <figure className="m-5">
            <img
              className="m-auto mt-5 mb-5 w-[700px] rounded-3xl drop-shadow"
              src="./images/centralizedpt1.png"
              alt="centralized_pt1"
            />
            <figcaption className="font-bold">
              Figure 2: Graph demonstrating the various possible routes between
              the nodes.
            </figcaption>
          </figure>
          <p>
            {" "}
            The table below will demonstrate the iterative process with this
            graph:
          </p>
          <figure className="m-5">
            <img
              className="m-auto mt-5 mb-5 w-[700px]"
              src="./images/centralizedtable2.png"
              alt="centralized_table2"
            />
            <figcaption className="font-bold">
              Table 1: Iterating Dijkstra&apos; algorithm, step by step. Note: we do
              not use infinity for any of the values in the table as all of them
              connect to the root node, A.
            </figcaption>
          </figure>
          <p>
            <b>Step 1</b>: We set our initial node to be A. <br />
            <b>Step 2</b>: We find the lowest cost connections between other
            nodes and A. <br />
            <b>Step 3</b>: We update the established nodes with the node values
            of which we’ve discovered the minimum cost of. <br />
            <b>Step 4</b>: Repeat the preceding steps until all the nodes have
            been established, i.e., all the minimal paths have been computed for
            all nodes. <br />
            <br />
            Using Dijkstra’s algorithm, the lowest cost route has been computed
            to be the following:
          </p>
          <figure className="m-5">
            <img
              className="m-auto mt-5 mb-5 w-[700px] rounded-3xl drop-shadow"
              src="./images/centralizedpt2.png"
              alt="centralized_pt2"
            />
            <figcaption className="font-bold">
              Figure 3: Lowest cost route computed through use of Dijkstra&apos;
              algorithm.
            </figcaption>
          </figure>
          <figure className="m-5">
            <img
              className="m-auto mt-5 mb-5 w-[700px]"
              src="./images/centralizedtable.png"
              alt="centralized_table"
            />
            <figcaption className="font-bold">
              Table 2: Lowest cost forwarding table, with root node starting at
              A.
            </figcaption>
          </figure>
          <p>
            As demonstrated above, node A{" "}
            <em>
              <b>MUST</b>
            </em>{" "}
            forward to node B regardless of its desired destination, as B is
            involved in all of the lowest-cost paths to other routers/nodes.{" "}
            <br /> <br />
          </p>
        </section>
        <motion.div
          animate={{ x: [100, 0] }}
          transition={{ type: "spring", stiffness: 100 }}
          className=""
        >
          <Link href="/decentralized">
            <motion.button
              className="m-5 border
         bg-blue-500 p-2 rounded-xl tracking-widest
          hover:bg-blue-700 text-white uppercase"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Decentralized
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
