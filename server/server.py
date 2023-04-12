from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS

import networkx as nx
import matplotlib.pyplot as plt
import time
import os


app = Flask(__name__)
CORS(app)


@app.route("/acceptData", methods=["POST"])
def get_Input():
    print(request)
    startNode = request.form["startNode"]; 
    endNode = request.form["endNode"];
    routingAlgorithm = request.form["routingAlgorithm"].lower();
    hosts = ('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8')
    if (startNode not in hosts or endNode not in hosts):
        return "<p>Invalid host. Ensure host is from h1 to h8.</p>";
    if routingAlgorithm == "centralized":
        animate_dijkstra(createGraph(), startNode, endNode)
    else:
        os.system(f'python decentralized.py {startNode} {endNode}')
    animationGifPath = 'success.gif';
    return animationGifPath;

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/animated/<path:path>')
def static_proxy(path):
  return send_from_directory('animated', path)

# create a graph
def createGraph():
    G = nx.Graph()

# add nodes
    G.add_nodes_from(['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'])

# add edges
    G.add_edge('r1', 'r2', weight=1)
    G.add_edge('r1', 'r3', weight=5)
    G.add_edge('r2', 'r3', weight=2)
    G.add_edge('r2', 'r4', weight=3)
    G.add_edge('r3', 'r5', weight=2)
    G.add_edge('r4', 'r5', weight=1)
    G.add_edge('r4', 'r6', weight=4)
    G.add_edge('r5', 'r7', weight=3)
    G.add_edge('r6', 'r7', weight=4)
    G.add_edge('r6', 'r8', weight=2)
    G.add_edge('r7', 'r8', weight=1)
    G.add_edge('h1', 'r1', weight=1)
    G.add_edge('h2', 'r1', weight=1)
    G.add_edge('h3', 'r1', weight=1)
    G.add_edge('h4', 'r2', weight=1)
    G.add_edge('h5', 'r2', weight=1)
    G.add_edge('h6', 'r3', weight=1)
    G.add_edge('h7', 'r6', weight=1)
    G.add_edge('h8', 'r7', weight=1)
    return G


def animate_dijkstra(G, source, target):
    # Initialize distances and previous nodes
    distances = {node: float('inf') for node in G.nodes()}
    distances[source] = 0
    previous = {node: None for node in G.nodes()}

    # Keep track of unvisited nodes
    unvisited = set(G.nodes())

    # Draw initial graph
    pos = nx.spring_layout(G)
    node_colors = ['red' if node != source else 'green' for node in G.nodes()]
    nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors)

    # Iterate until all nodes are visited
    while unvisited:
        # Find unvisited node with shortest distance
        current = min(unvisited, key=lambda node: distances[node])
        unvisited.remove(current)

        # Highlight current node
        node_colors = ['red' if node != current else 'green' for node in G.nodes()]
        nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors)

        # Pause briefly
        plt.pause(0.5)
        time.sleep(0.5)

        # Stop if target node is reached
        if current == target:
            break

        # Update distances to neighbors of current node
        for neighbor in G.neighbors(current):
            distance = distances[current] + G.edges[current, neighbor]['weight']
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current

                # Highlight edge to neighbor
                edge_colors = ['black' if edge != (current, neighbor) else 'green' for edge in G.edges()]
                nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)

                # Pause briefly
                plt.pause(0.2)
                time.sleep(0.2)

    # Construct shortest path from source to target
    path = [target]
    while path[-1] != source:
        path.append(previous[path[-1]])
    path.reverse()

    # Highlight nodes and edges on the shortest path
    node_colors = ['green' if node in path else 'red' for node in G.nodes()]
    edge_colors = ['green' if edge in zip(path, path[1:]) else 'black' for edge in G.edges()]

    # Highlight final node
    node_colors = ['green' if node == target else 'red' for node in G.nodes()]
    nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)

    # Show final graph
    plt.show()
