import React, { useState } from "react";
import AnimatedLink from "../ui/AnimatedLink";
import GraphItem from "./GraphItem";

/**
 * *** Experimental *** 
 * This component probes user to create a network Graph to traverse through using the various algorithms
 */
export default function NetworkCustomizer() {

  // Ideally TypeScript should have been used from the get go...
  // Initialize default hosts and routers, and a bare minimum link between the hosts and router.
  const [hosts, setHosts] = useState([{
    id: "h1"
  }, {
    id: "h2"
  }]);
  const [routers, setRouters] = useState([{
    id: "r1"
  }, {
    id: "r2"
  }]);
  const [links, setLinks] = useState([{
		"weight": 1,
		"source": "r1",
		"target": "r2"
	}]);

  const handleSubmit = (event) => {
    


    // event.preventDefault();

    // // Set image to loading spinner
    // props.updateImage(spinner);
    // props.setLoading(true);
    // // Generate unique random number for refresh hack
    // let refreshNumber = Math.random() * 444007;
    // while (refreshNumber === randomNum ) refreshNumber = Math.random() * 444007; 

    // let data = new FormData();
    // for (const [key, value] of Object.entries(routingData)) {
    //   data.append(key, value);
    // }

    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "http://localhost:5000/",
    //   headers: {},
    //   data: data,
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     setRandomNum(refreshNumber);
    //     props.updateImage(`http://localhost:5000/gif/${response.data}?refreshHack=${refreshNumber}`);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     props.updateImage(defaultImageURL);
    //   })
    //   .finally(() => props.setLoading(false));
  };


  const addNode = (type) => {
    // 
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
      <h1 className="font-bold drop-shadow-lg">Hosts</h1>
      {hosts.map(host => <GraphItem key={host.id} type="host" id={host.id} removeNode={removeNode} />)}
      <h1 className="font-bold drop-shadow-lg">Routers</h1>
      {routers.map(router => <GraphItem key={router.id} type="router" id={router.id} removeNode={removeNode} />)}
      <h1 className="font-bold drop-shadow-lg">Edges</h1>
      {links.map(link => renderLink(link))}
      <form onSubmit={handleSubmit} id="routingInformation" method="post">
        <input
          className="cursor-pointer hover:scale-110 transition-transform bg-[#fffbf4] text-black text-center p-2 mb-6 rounded-lg drop-shadow"
          type="submit"
          value="Preview Graph"
        ></input>
      </form>
    </>
  );
}
