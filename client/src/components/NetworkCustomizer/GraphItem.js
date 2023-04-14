import React from "react";

export default function GraphItem(props) {

    const deleteNode = (node) => {
        props.removeNode(node);
    }

    const deleteEdge = (edge) => {
        props.removeEdge(edge);
    }

    return (
        <>
            {props.type === "link" ?
                <li className="list-none" key={`${props.source}-${props.target}`}>{props.source} to {props.target} - Weight: {props.weight}<button className="text-red-700" onClick={deleteEdge}>X</button></li> :
                <li className="list-none" key={props.id}>{props.id} - {props.type} <button className="text-red-700" onClick={deleteNode}>X</button></li>}
        </>
    );
}