from flask import Flask, request

import networkx as nx
import matplotlib.pyplot as plt
import time

app = Flask(__name__)

@app.route("/acceptData", methods=["POST"])
def get_Input():
    print(request)
    startNode = request.form["startNode"]
    endNode = request.form["endNode"]
    animate_shortest_path(createGraphTing(), startNode, endNode);
    return "<p>Acknowledged start and end" + startNode + endNode + " </p>";

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

def createGraphTing():
    # create a graph
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

def animate_shortest_path(G, source, target):
    # Find shortest path
    path = nx.dijkstra_path(G, source=source, target=target, weight='weight')

    # Highlight nodes and edges on the shortest path
    node_colors = ['green' if node in path else 'red' for node in G.nodes()]
    edge_colors = ['green' if edge in zip(path, path[1:]) else 'black' for edge in G.edges()]

    # Draw initial graph
    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)

    # Animate shortest path
    for i in range(len(path)-1):
        # Highlight current node and edge
        node_colors = ['green' if node == path[i] else 'red' for node in G.nodes()]
        edge_colors = ['green' if edge == (path[i], path[i+1]) else 'black' for edge in G.edges()]

        # Redraw graph
        nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)

        # Pause briefly
        plt.pause(0.5)
        time.sleep(0.5)

    # Highlight final node
    node_colors = ['green' if node == path[-1] else 'red' for node in G.nodes()]
    nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)

    # Show final graph
    plt.show()