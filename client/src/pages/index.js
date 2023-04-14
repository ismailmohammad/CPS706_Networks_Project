import { motion } from "framer-motion";
import Head from "next/head";
import Header from "../components/infomational/Header.js";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import NetworkCustomizer from "@/components/NetworkCustomizer/NetworkCustomizer.js";
import AnimatedLink from "@/components/ui/AnimatedLink.js";
import SampleGraph from "@/components/SampleGraph.js";

const groupMembers = [
  { id: 1, name: "Shayan Shahaei", studentNumber: "500872625" },
  { id: 2, name: "Shahzeb Nizam", studentNumber: "500694152" },
  { id: 3, name: "Nahum Eshetu", studentNumber: "500651787" },
  { id: 4, name: "Dan Nadeem", studentNumber: "500717805" },
  { id: 5, name: "Mohammad Ismail", studentNumber: "500777447" },
];


const defaultImageURL = './images/defaultGraph.png';  

export default function Home() {
  // Grab client-side routing parameter for selecting which graph to work with
  const router = useRouter();
  const { graphType } = router.query;


  const [resultsGif, setResultsGif] = useState(null);
  const [loading, setLoading] = useState(false);
  
  return (
    <>
      <Head>
        <title>CPS706 - Routing Algorithms Visualizer</title>
      </Head>
      <Header route={router.asPath} />
      <div className="m-5 text-center">
        <section>
          <h1 className="tracking-widest uppercase m-5 text-xl">
            Routing Algorithms Visualization Tool
          </h1>
          <p>
          The purpose of routing algorithms is to determine efficient paths (where efficiency may be measured in terms of minimal delay, degree of congestion, etc) from one host to another through a network of routers. The most efficient path may be the one that results in minimal delay, economic cost, minimal congestion, or a combination of these. The path is defined as the sequence of routers packets traversing from given initial source host to a final destination host. Furthermore, these routes can either be static – where routes change slowly over time, or dynamic – where routes change rapidly, and are in response to changes in link costs between nodes/routers.
          </p>

          {/* Visualization Tool Selection */}
          <div className="m-5 p-5 bg-blue-500 text-white rounded-2xl drop-shadow-md">
            { !graphType ? 
          <div>
          <h1 className="tracking-widest uppercase m-5 text-xl"> Would you like to learn using our sample graph below or customize it? </h1>
          <motion.div
          animate={{ x: [100, 0] }}
          transition={{ type: "spring", stiffness: 100 }}
          className=""
        >
          <AnimatedLink className="bg-gray-700 hover:bg-gray-900" title="Sample Network Graph" route="/?graphType=sample"/>
          <AnimatedLink className="bg-gray-700 hover:bg-gray-900" title="Customize Network *Experimental*" route="/?graphType=customizable"/>
        </motion.div>
        </div> : null } 
        {/* Display the relevant Component to the user */}
        {graphType ? graphType === "sample" ? <span>{graphType}</span> && <SampleGraph setLoading={setLoading} setResultsGif={setResultsGif} /> : <span>{graphType}</span> && <NetworkCustomizer /> : null}
        </div>


  
        </section>
        <div>
        <p className="m-2">
          This webapp is an interactive educational tool that can help students understand network routing algorithms. select start and end host nodes and press the button below to generate a visualization of the routing algorithm on a network. You can also press the buttons below to learn more about routing algorithms.
        </p>

        {/* Image Displayed to user (loading, default graph, resulting gif) */}
        {!loading && !resultsGif ? <img className="m-auto rounded-3xl drop-shadow w-2/5" src={defaultImageURL} /> :
          loading ? <Image className="m-auto" src={resultsGif} /> :
            <img className="m-auto rounded-3xl drop-shadow" src={resultsGif} />}


        </div>
        <motion.div
          animate={{ x: [100, 0] }}
          transition={{ type: "spring", stiffness: 100 }}
          className=""
        >
          <h2 className="tracking-widest uppercase m-5 text-xl">
            Routing Algorithms Information
          </h2>
          <AnimatedLink title="Centralized" route="/centralized" />
          <AnimatedLink title="Decentralized" route="/decentralized" />
        </motion.div>

      
        
        <div className="m-5">
          Collaborators:
          {groupMembers.map(({ id, name, studentNumber }) => {
            return (
              <div key={id}>
                {name}, {studentNumber}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
