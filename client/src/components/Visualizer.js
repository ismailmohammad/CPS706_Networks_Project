import React from "react";
import spinner from "../assets/loadingSpinner.gif";
import axios from "axios";
import { useState } from "react";

/**
 * This functional component returns a form that interacts with the Flask backend to select the nodes and algorithm to display
 */
export default function Visualizer(props) {
  // State Management
  const [randomNum, setRandomNum] = useState(444);

  // Populate Hosts
  const hostOptions = [];
  props.hosts.forEach((host) =>
    hostOptions.push(<option value={host}>${host}</option>)
  );

  // Initialize default 
  const [routingData, setRoutingData] = useState({
    startNode: props.hosts[0],
    endNode: props.hosts[0],
    routingAlgorithm: "Centralized",
  });

  const onFormChange = (event) => {
    setRoutingData((routingData) => ({
      ...routingData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Set image to loading spinner
    props.updateImage(spinner);
    props.setLoading(true);
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
        props.updateImage(`http://localhost:5000/gif/${response.data}?refreshHack=${refreshNumber}`);
      })
      .catch((error) => {
        console.log(error);
        props.updateImage(defaultImageURL);
      })
      .finally(() => props.setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} id="routingInformation" method="post">
      <label className="font-bold drop-shadow-lg" htmlFor="startNode">Starting Node:{" "}</label>
      <select
        className="cursor-pointer bg-[#f5f5dc] mb-5 text-white text-center p-2 mb-6 text-sm border border-gray-600 rounded-lg bg-gray-50 bg-gray-700 placeholder-gray-400 hover:scale-110 transition-transform"
        id="startNode"
        name="startNode"
        onChange={onFormChange}
      >
        {props.hosts.map(host => <option key={host} value={host}>{host}</option>)}
      </select>
      <br />
      <label className="font-bold drop-shadow-lg" htmlFor="endNode">End Node:{" "}</label>
      <select
        className="cursor-pointer bg-[#f5f5dc] mb-5 text-white text-center p-2 mb-6 text-sm border border-gray-600 rounded-lg bg-gray-50 bg-gray-700 placeholder-gray-400 hover:scale-110 transition-transform"
        id="endNode"
        name="endNode"
        onChange={onFormChange}
      >
        {props.hosts.map(host => <option key={host} value={host}>{host}</option>)}
      </select>
      <br />
      <label className="font-bold drop-shadow-lg" htmlFor="routingAlgorithm">Routing Algorithm:{" "}</label>
      <select
        className="cursor-pointer bg-[#f5f5dc] mb-5 text-white text-center p-2 mb-6 text-sm border border-gray-600 rounded-lg bg-gray-50 bg-gray-700 placeholder-gray-400 hover:scale-110 transition-transform"
        id="routingAlgorithm"
        name="routingAlgorithm"
        onChange={onFormChange}
      >
        <option key="Centralized" value="Centralized">Centralized</option>
        <option key="Decentralized" value="Decentralized">Decentralized</option>
      </select>
      <br />
      <input
        className="cursor-pointer hover:scale-110 transition-transform bg-[#fffbf4] text-black text-center p-2 mb-6 rounded-lg drop-shadow"
        type="submit"
        value="Generate Visualization"
      ></input>
    </form>
  );
}
