from flask import Flask

import networkx as nx
import matplotlib.pyplot as plt

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# create a graph
G = nx.Graph()

# add nodes with labels
nodes = ['A', 'B', 'C', 'D', 'E', 'ISP']
G.add_nodes_from(nodes)

# add edges between A,B,C,D,E and ISP
for node in nodes[:-1]:
    G.add_edge(node, 'ISP')

# Link ISP to TMU
G.add_edge('ISP', 'TMU')

# position the nodes in a circle
pos = nx.circular_layout(G)

# draw the nodes
nx.draw_networkx_nodes(G, pos, node_color='w', edgecolors='k', node_size=1000)

# draw the labels
nx.draw_networkx_labels(G, pos, font_size=20, font_family='sans-serif')

# draw the edges
nx.draw_networkx_edges(G, pos)

# show the graph
plt.axis('off')
plt.show()