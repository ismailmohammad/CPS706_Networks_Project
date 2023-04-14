import React from "react";
import Link from "next/link";
import Visualizer from "./Visualizer";
import AnimatedLink from "./ui/AnimatedLink";

/**
 * This component uses a sample Graph to traverse through using the various algorithms
 */
export default function SampleGraph(props) {

  const HOSTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];

  return (
    <>
    <AnimatedLink route="/?graphType=customizable" title="Try Customizing Graph Instead" />
    <Visualizer setLoading={props.setLoading} updateImage={props.setResultsGif} hosts={HOSTS}/>
    </>
  );
}
