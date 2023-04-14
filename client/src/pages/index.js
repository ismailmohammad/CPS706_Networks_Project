import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/infomational/Header.js";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import spinner from "../assets/loadingSpinner.gif";
import { useRouter } from "next/router";
import NetworkCustomizer from "@/components/NetworkCustomizer.js";
import Visualizer from "@/components/Visualizer.js";
import AnimatedLink from "@/components/ui/AnimatedLink.js";
import SampleGraph from "@/components/SampleGraph.js";

const groupMembers = [
  { id: 1, name: "Shayan Shahaei", studentNumber: "500872625" },
  { id: 2, name: "Shahzeb Nizam", studentNumber: "500694152" },
  { id: 3, name: "Nahum Eshetu", studentNumber: "500651787" },
  { id: 4, name: "Dan Nadeem", studentNumber: "500717805" },
  { id: 5, name: "Mohammad Ismail", studentNumber: "500777447" },
];

const HOSTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];
const ALGORITHMS = ['Centralized', 'Decentralized'];
const defaultImageURL = './images/defaultGraph.png';  

export default function Home() {
  // Grab client-side routing parameter for selecting which graph to work with
  const router = useRouter();
  const { graphType } = router.query;

  const hostOptions = [];
  HOSTS.forEach((host) =>
    hostOptions.push(<option value={host}>${host}</option>)
  );

  const [routingData, setRoutingData] = useState({
    startNode: HOSTS[0],
    endNode: HOSTS[0],
    routingAlgorithm: "Centralized",
  });

  const [resultsGif, setResultsGif] = useState(null);
  const [loading, setLoading] = useState(false);
  const [randomNum, setRandomNum] = useState(444);

  const onFormChange = (event) => {
    setRoutingData((routingData) => ({
      ...routingData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Set image to loading spinner
    setResultsGif(spinner);
    setLoading(true);
    // Generate unique random number for refresh hack
    let refreshNumber = Math.random() * 444007;
    while (refreshNumber === randomNum ) refreshNumber = Math.random() * 444007; 

    let data = new FormData();
    for (const [key, value] of Object.entries(routingData)) {
      data.append(key, value);
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/",
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setRandomNum(refreshNumber);
        setResultsGif(`http://localhost:5000/gif/${response.data}?refreshHack=${refreshNumber}`);
      })
      .catch((error) => {
        console.log(error);
        setResultsGif(defaultImageURL);
      })
      .finally(() => setLoading(false));
  };

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
          
          <div className="m-5 p-5 bg-blue-500 text-white rounded-2xl drop-shadow-md">
            { !graphType ? 
          <div>
          <h1 className="tracking-widest uppercase m-5 text-xl"> Would you like to learn using our sample graph or customize it? </h1>
          <motion.div
          animate={{ x: [100, 0] }}
          transition={{ type: "spring", stiffness: 100 }}
          className=""
        >
          <AnimatedLink title="Sample Network Graph" route="/?graphType=sample"/>
          <AnimatedLink title="Customize Network *Experimental*" route="/?graphType=customizable"/>
        </motion.div>
        </div> : null } 
        {/* Display the releveant Component to the user */}
        {graphType ? graphType === "sample" ? <span>{graphType}</span> && <SampleGraph /> : <span>{graphType}</span> && <NetworkCustomizer /> : null}
            {/* <form onSubmit={handleSubmit} id="routingInformation" method="post">
              <label className="font-bold drop-shadow-lg" htmlFor="startNode">Starting Node:{" "}</label>
                <select
                  className="cursor-pointer bg-[#f5f5dc] mb-5 text-white text-center p-2 mb-6 text-sm border border-gray-600 rounded-lg bg-gray-50 bg-gray-700 placeholder-gray-400 hover:scale-110 transition-transform"
                  id="startNode"
                  name="startNode"
                  onChange={onFormChange}
                >
                  {HOSTS.map( host =>  <option key={host} value={host}>{host}</option>)}
                </select>
              <br />
              <label className="font-bold drop-shadow-lg" htmlFor="endNode">End Node:{" "}</label>
                <select
                  className="cursor-pointer bg-[#f5f5dc] mb-5 text-white text-center p-2 mb-6 text-sm border border-gray-600 rounded-lg bg-gray-50 bg-gray-700 placeholder-gray-400 hover:scale-110 transition-transform"
                  id="endNode"
                  name="endNode"
                  onChange={onFormChange}
                >
                  {HOSTS.map( host =>  <option key={host} value={host}>{host}</option>)}
                </select>
              <br />
              <label className="font-bold drop-shadow-lg" htmlFor="routingAlgorithm">Routing Algorithm:{" "}</label>
                <select
                  className="cursor-pointer bg-[#f5f5dc] mb-5 text-white text-center p-2 mb-6 text-sm border border-gray-600 rounded-lg bg-gray-50 bg-gray-700 placeholder-gray-400 hover:scale-110 transition-transform"
                  id="routingAlgorithm"
                  name="routingAlgorithm"
                  onChange={onFormChange}
                >
                 {ALGORITHMS.map(algo => <option key={algo} value={algo}>{algo}</option>)}
                </select>
              <br />
              <input
                className="cursor-pointer hover:scale-110 transition-transform bg-[#fffbf4] text-black text-center p-2 mb-6 rounded-lg drop-shadow"
                type="submit"
                value="Generate Visualization"
              ></input>
            </form> */}
          </div>
  
        </section>
        <div>
        <p>
          This webapp is an interactive educational tool that can help students understand network routing algorithms. select start and end host nodes and press the button below to generate a visualization of the routing algorithm on a network. You can also press the buttons below to learn more about routing algorithms.
        </p>
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
        {!loading && !resultsGif ? <img className="m-auto rounded-3xl drop-shadow" src={defaultImageURL} /> :
          loading ? <Image className="m-auto" src={resultsGif} /> :
            <img className="m-auto rounded-3xl drop-shadow" src={resultsGif} />}
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
