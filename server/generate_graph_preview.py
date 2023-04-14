import networkx as nx
import matplotlib.pyplot as plt
import os
from PIL import Image
import sys
import json
from datetime import datetime


def generate_preview(filename=sys.argv[1]):
    # Read the json object from which a graph is to be created from
    with open(f'{filename}.json', "r") as read_file:
        graph_data = json.load(read_file)
    # Create Graph from json object
    G = nx.node_link_graph(graph_data);
    # Draw initial graph
    pos = nx.spring_layout(G)
    node_colors = ['red' if node != "h1" else 'green' for node in G.nodes()]
    nx.draw(G, pos, with_labels=True, font_weight='bold', node_color=node_colors)
    plt.savefig(f'{filename}.png', format='png')


generate_preview()