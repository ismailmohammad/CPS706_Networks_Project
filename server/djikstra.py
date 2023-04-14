import networkx as nx
import matplotlib.pyplot as plt
import os
from PIL import Image
import sys
import json

def dijkstra(source=sys.argv[1], target=sys.argv[2], graphFilename=sys.argv[3]):
    # Read the json object from which a graph is to be created from
    with open(graphFilename, "r") as read_file:
        graph_data = json.load(read_file)

    # Create Graph from json object
    G = nx.node_link_graph(graph_data);

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
    plt.savefig('graph.png', format='png')

    # Initialize list to store images
    images = []

    # Add initial image to list of images
    images.append(Image.open('graph.png'))

    # Initialize counter for generating unique filenames
    counter = 0

    # Iterate until all nodes are visited
    while unvisited:
        # Find unvisited node with shortest distance
        current = min(unvisited, key=lambda node: distances[node])
        unvisited.remove(current)

        # Highlight current node
        node_colors = ['red' if node != current else 'green' for node in G.nodes()]
        nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors)

        # Pause briefly and save image
        plt.savefig(f'frame_{counter}.png')
        images.append(Image.open(f'frame_{counter}.png'))

        # Increment counter
        counter += 1

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
                edge_colors = ['green' if edge == (current, neighbor) else 'black' for edge in G.edges()]
                nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)

                # Pause briefly and save image
                plt.savefig(f'frame_{counter}.png')
                images.append(Image.open(f'frame_{counter}.png'))

                # Increment counter
                counter += 1

    # Construct shortest path from source to target
    path = nx.shortest_path(G, source=source, target=target, weight='weight')

    # Highlight nodes and edges on the shortest path
    node_colors = ['green' if node in path else 'red' for node in G.nodes()]
    edge_colors = ['green' if edge in zip(path, path[1:]) else 'black' for edge in G.edges()]

    # Draw final graph and append to list of images
    nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)
    plt.savefig(f'frame_{counter}.png')
    images.append(Image.open(f'frame_{counter}.png'))

    images[0].save('gif/animation.gif', save_all=True, append_images=images[1:], duration=500, loop=0)

    # Delete all frame.png files except graph.png and animation.gif
    for file in os.listdir():
        if file.startswith('frame') and file.endswith('.png') and file != 'graph.png' and file != 'animation.gif':
            os.remove(file)

dijkstra()