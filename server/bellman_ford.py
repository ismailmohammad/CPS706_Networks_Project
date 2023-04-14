import os
import networkx as nx
import matplotlib.pyplot as plt
from PIL import Image
import sys

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

def bellman_ford(source=sys.argv[1], target=sys.argv[2]):
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

        # Stop if destination node is reached
        if current == destination:
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

    # Construct shortest path from source to destination
    path = [destination]
    while path[-1] != source:
        path.append(previous[path[-1]])
    path = path[::-1]

    # Highlight nodes and edges on the shortest path
    node_colors = ['green' if node in path else 'red' for node in G.nodes()]
    edge_colors = ['green' if edge in zip(path, path[1:]) else 'black' for edge in G.edges()]

    # Draw final graph and append to list of images
    nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)
    plt.savefig(f'frame_{counter}.png')
    images.append(Image.open(f'frame_{counter}.png'))

    # Save images as animation
    images[0].save('gifs\animation.gif', save_all=True, append_images=images[1:], duration=500, loop=0)

    # Delete all frame.png files except graph.png and animation.gif
    for file in os.listdir():
        if file.startswith('frame') and file.endswith('.png') and file != 'graph.png' and file != 'animation.gif':
            os.remove(file)

bellman_ford()
