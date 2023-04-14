import { Inter } from "@next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/Header.js";
import { useState } from "react";
import axios from "axios";
import Image from "next/image"
import spinner from "../assets/loadingSpinner.gif";

const inter = Inter({ subsets: ["latin"] });

const groupMembers = [
  { id: 1, name: "Shayan Shahaei", studentNumber: "***REMOVED***" },
  { id: 2, name: "Shahzeb Nizam", studentNumber: "500723523" },
  { id: 3, name: "Nahum Eshetu", studentNumber: "***REMOVED***" },
  { id: 4, name: "Dan Nadeem", studentNumber: "***REMOVED***" },
  { id: 5, name: "Mohammad Ismail", studentNumber: "***REMOVED***" },
];

const HOSTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];
const ALGORITHMS = ['Centralized', 'Decentralized'];
const defaultImageURL = './images/centralizedpt1.png';

export default function Home() {

  const hostOptions = [];
  HOSTS.forEach(host => hostOptions.push(<option value={host}>${host}</option>))

  const [routingData, setRoutingData] = useState({
    startNode: HOSTS[0],
    endNode: HOSTS[0],
    routingAlgorithm: "Centralized",
  });

  const [resultsGif, setResultsGif] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFormChange = (event) => {
    setRoutingData((routingData) => ({
      ...routingData,
      [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Set image to loading spinner
    setResultsGif(spinner);
    setLoading(true);

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
        setResultsGif(`http://localhost:5000/gif/${response.data}`);
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
        <title>CPS706 Project</title>
      </Head>
      <Header />
      <div className="m-5 text-center">
        <section>
          <h1 className="tracking-widest uppercase m-5 text-xl">
            Routing Algorithms
          </h1>
          <p>
            Purpose is to determine efficient paths from sending hosts to
            receiving host, through a network of routers (paraphrase this) Path
            is defined as the sequence of routers packets traversing from given
            initial source host to final destination host Efficient in terms of
            least cost, fastest, least congested (depends on what we are
            prioritizing) - can be static: routes change slowly over time - can
            be dynamic: routes change rapidly, changes are in response to link
            cost changes
          </p>
          <div className="m-5 p-5 bg-blue-500 text-white rounded-2xl drop-shadow-md">
            <form onSubmit={handleSubmit} id="routingInformation" method="post">
              <label className="font-bold" htmlFor="startNode">Starting Node:{" "}</label>
                <select
                  className="cursor-pointer bg-[#f5f5dc] mb-5 text-white text-center p-2 mb-6 text-sm border border-gray-600 rounded-lg bg-gray-50 bg-gray-700 placeholder-gray-400"
                  id="startNode"
                  name="startNode"
                  onChange={onFormChange}
                >
                  {HOSTS.map( host =>  <option key={host} value={host}>{host}</option>)}
                </select>
              <br />
              <label className="font-bold" htmlFor="endNode">End Node:{" "}</label>
                <select
                  className="cursor-pointer bg-[#f5f5dc] mb-5 text-white text-center p-2 mb-6 text-sm border border-gray-600 rounded-lg bg-gray-50 bg-gray-700 placeholder-gray-400"
                  id="endNode"
                  name="endNode"
                  onChange={onFormChange}
                >
                  {HOSTS.map( host =>  <option key={host} value={host}>{host}</option>)}
                </select>
              <br />
              <label className="font-bold" htmlFor="routingAlgorithm">Routing Algorithm:{" "}</label>
                <select
                  className="cursor-pointer bg-[#f5f5dc] mb-5 text-white text-center p-2 mb-6 text-sm border border-gray-600 rounded-lg bg-gray-50 bg-gray-700 placeholder-gray-400"
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
            </form>
          </div>
        </section>
        <motion.div
          animate={{ x: [100, 0] }}
          transition={{ type: "spring", stiffness: 100 }}
          className=""
        >
          <Link href="/centralized">
            <motion.button
              className="m-5 border
         bg-blue-500 p-2 rounded-md tracking-widest
          hover:bg-blue-700 text-white uppercase"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Centralized
            </motion.button>
          </Link>
          <Link href="/decentralized">
            <motion.button
              className="m-5 border 
        bg-blue-500 p-2 rounded-md tracking-widest
         hover:bg-blue-700 text-white uppercase"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Decentralized
            </motion.button>
          </Link>
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
