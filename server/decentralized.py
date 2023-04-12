from server import createGraph
import networkx as nx
import matplotlib.pyplot as plt
import time
import random
import sys

def animate_decentralized(G=createGraph(), source=sys.argv[1], target=sys.argv[2]):
    # Initialize distances and routing tables
    distances = {node: {n: float('inf') for n in G.nodes()} for node in G.nodes()}
    next_hops = {node: {n: None for n in G.nodes()} for node in G.nodes()}
    for node in G.nodes():
        distances[node][node] = 0
        for neighbor in G.neighbors(node):
            distances[node][neighbor] = G.edges[node, neighbor]['weight']
            next_hops[node][neighbor] = neighbor

    # Keep track of unvisited nodes
    unvisited = set(G.nodes())

    # Draw initial graph
    pos = nx.spring_layout(G)
    node_colors = ['red' if node != source else 'green' for node in G.nodes()]
    nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors)

    # Iterate until all nodes have converged on shortest paths
    while unvisited:
        # Choose a random node from the unvisited set
        current = random.choice(list(unvisited))
        unvisited.remove(current)

        # Broadcast routing table to neighbors
        for neighbor in G.neighbors(current):
            distance_vector = distances[current]
            distance_vector[current] = float('inf')
            next_hop_vector = next_hops[current]
            message = (current, distance_vector, next_hop_vector)
            G.nodes[neighbor]['message'] = message

        # Update routing tables based on received messages
        updated = False
        for node in G.nodes():
            message = G.nodes[node].get('message')
            if message:
                sender, distance_vector, next_hop_vector = message
                for destination in G.nodes():
                    new_distance = distance_vector[current] + distances[current][destination]
                    if new_distance < distances[node][destination]:
                        distances[node][destination] = new_distance
                        next_hops[node][destination] = next_hops[sender][destination]
                        updated = True

        # Highlight current node
        node_colors = ['red' if node != current else 'green' for node in G.nodes()]
        nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors)

        # Pause briefly
        plt.pause(0.5)
        time.sleep(0.5)

        # Stop if target node is reached
        if current == target:
            break

        # Highlight edges on shortest path to target
        edge_colors = []
        next_hop = next_hops[current][target]
        while next_hop != target:
            edge_colors.append((current, next_hop))
            current = next_hop
            next_hop = next_hops[current][target]
        edge_colors.append((current, target))
        edge_colors = ['green' if edge in edge_colors else 'black' for edge in G.edges()]
        nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)

        # Pause briefly
        plt.pause(0.2)
        time.sleep(0.2)

    # Construct shortest path from source to target
    path = [target]
    while path[-1] != source:
        path.append(next_hops[source][path[-1]])
    path.reverse()

    # Highlight nodes and edges on the shortest path
    node_colors = ['green' if node in path else 'red' for node in G.nodes()]
    edge_colors = ['green' if edge in zip(path, path[1:]) else 'black' for edge in G.edges()]

    # Highlight final node
    node_colors = ['green' if node == target else 'red' for node in G.nodes()]
    nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors, edge_color=edge_colors)

    # Show final graph
    plt.show()

animate_decentralized();