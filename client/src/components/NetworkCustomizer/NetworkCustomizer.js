import React, { use, useState } from "react";
import AnimatedLink from "../ui/AnimatedLink";
import GraphItem from "./GraphItem";
import { useRouter } from "next/router";
import Link from "next/link";
import Visualizer from "../Visualizer";
import spinner from "../../assets/loadingSpinner.gif"
import axios from "axios";

/**
 * *** Experimental *** 
 * This component probes user to create a network Graph to traverse through using the various algorithms
 */
export default function NetworkCustomizer(props) {

  const router = useRouter();
  const { visualize } = router.query;

  // Starting node number
  const startingNodeNum = 3;

  // Ideally TypeScript should have been used from the get go...
  // Initialize default hosts and routers, and a bare minimum link between the hosts and router.
  const [hosts, setHosts] = useState({
    "ids": ["h1", "h2"]
  });
  const [routers, setRouters] = useState({
    "ids": ["r1", "r2"]
  });
    
  const [links, setLinks] = useState([{
		"weight": 1,
		"source": "r1",
		"target": "r2"
	}, {
		"weight": 3,
		"source": "r1",
		"target": "h1"
	}, {
		"weight": 2,
		"source": "r1",
		"target": "h2"
	}]);
  const [graphURL, setGraphURL] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Set image to loading spinner
    props.updateImage(spinner);
    props.setLoading(true);

    // Construct Graph Objbect
    let data = JSON.stringify({
      "directed": false,
      "multigraph": false,
      "graph": {},
      "nodes": [
        {
          "id": "r1"
        },
        {
          "id": "r2"
        },
        {
          "id": "h1"
        },
        {
          "id": "h2"
        }
      ],
      "links": [
        {
          "weight": 1,
          "source": "r1",
          "target": "r2"
        },
        {
          "weight": 3,
          "source": "r1",
          "target": "h1"
        },
        {
          "weight": 2,
          "source": "r1",
          "target": "h2"
        }
      ]
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/generate-graph',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        const url = `http://localhost:5000/${response.data}.png`
        props.updateImage(url);
        setGraphURL(`${response.data}.json`);
      })
      .catch((error) => {
        console.log(error);
        alert("Fetch Error, please try again. ")
      })
      .finally(() => props.setLoading(false));
  };


  const addNode = (type="host") => {
    if (type === "router") {
      setRouters(routers => {
        let num = startingNodeNum;
        let id = `r${num}`;
        while (id in routers.ids) {
          id = `r${num}`;
          id += 1;
        } 
        routers.ids.push(id)
      })  
    } else {
      setHosts(hosts => {
        let idList = hosts.ids;
        let num = startingNodeNum;
        let id = `h${num}`;
        while (id in idList) {
          id = `h${num}`;
          id += 1;
        } 
        hosts.ids = idList
      })      
    }
  }

  const removeNode = (node) => {
    if (node.id === "h1" || node.id === "h2") {
      console.log("cant deleet");
      return alert("Cannot delete initial nodes.");
    }
    // Remove node
    // remove any edges pertaining to node
  }

  const addEdge = (startNode, endNode) => {

  }

  const removeEdge = (edge) => {

  }

  const renderLink = (link) => {
    const { weight, source, target } = link;
    const key = `${source}-${target}`
    return <GraphItem key={key} type="link" weight={weight} source={source} target={target} removeEdge={removeEdge} />
  }

  return (
    <>
      <AnimatedLink route="/?graphType=sample" title="Try Sample Graph Instead" />
      { !visualize ? <>
      <h1 className="font-bold drop-shadow-lg">Hosts</h1>
      {hosts.ids?.map(id => <GraphItem key={id} type="host" id={id} removeNode={removeNode} />)}
      <h1 className="font-bold drop-shadow-lg">Routers</h1>
      {routers.ids?.map(id => <GraphItem key={id} type="router" id={id} removeNode={removeNode} />)}
      <h1 className="font-bold drop-shadow-lg">Edges</h1>
      {links.map(link => renderLink(link))}
      <br />
      <form onSubmit={handleSubmit} id="routingInformation" method="post">
        <input
          className="cursor-pointer hover:scale-110 transition-transform bg-[#fffbf4] text-black text-center p-2 mb-6 rounded-lg drop-shadow"
          type="submit"
          value="Preview Graph"
        ></input>
        <br />
      </form>
      <button onClick={() => addNode("host")} className="m-2 cursor-pointer hover:scale-110 transition-transform bg-gray-400 text-black text-center p-2 mb-6 rounded-lg drop-shadow">
        Add Host</button>
        <button onClick={() => addNode("router")} className="m-2 cursor-pointer hover:scale-110 transition-transform bg-gray-400 text-black text-center p-2 mb-6 rounded-lg drop-shadow">
        Add Router</button>
      <button className="m-2 cursor-pointer hover:scale-110 transition-transform bg-gray-400 text-black text-center p-2 mb-6 rounded-lg drop-shadow">
        Add Edge</button>
        <Link href="/?graphType=customize&visualize=true">
      <button className="m-2 cursor-pointer hover:scale-110 transition-transform bg-green-300 text-black text-center p-2 mb-6 rounded-lg drop-shadow">
        Select Visualization Parameters</button>
        </Link>
      </> : null }
      {visualize ? <Visualizer graphURL={graphURL} setLoading={props.setLoading} updateImage={props.updateImage} hosts={hosts.ids} /> : null}
    </>
  );
}
