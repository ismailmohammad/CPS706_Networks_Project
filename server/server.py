from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS

from datetime import datetime
import networkx as nx
import matplotlib.pyplot as plt
import os
import json

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["POST"])
def get_Input():
    startNode = request.form["startNode"]; 
    endNode = request.form["endNode"];
    routingAlgorithm = request.form["routingAlgorithm"].lower();
    graphURL = request.form["graphURL"];
    if not graphURL:
        graphURL = "graphObjects/sample.json"
    # customGraph = request.form["customGraph"].lower();
    hosts = ('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8')
    if (startNode not in hosts or endNode not in hosts):
        return "<p>Invalid host. Ensure host is from h1 to h8.</p>";
    if routingAlgorithm == "centralized":
        os.system(f'python djikstra.py {startNode} {endNode} {graphURL}')
    else:
        os.system(f'python bellman_ford.py {startNode} {endNode} {graphURL}')
    animationGifPath = 'animation.gif';
    return animationGifPath;

@app.route('/generate-graph', methods=["POST"])
def generate_graph():
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    generatedGraphPath=f'graphObjects/customGraph-{timestamp}';
    graph_data = request.get_json();
    # Save the graph object as JSON
    with open(f'{generatedGraphPath}.json', 'w') as outfile:
        outfile.write(json.dumps(graph_data))
    os.system(f'python generate_graph_preview.py {generatedGraphPath} {graph_data}')
    return generatedGraphPath;

@app.route('/gif/<path:path>')
def static_proxy_gif(path):
  return send_from_directory('gif', path)

# Serve generated graph images and graph object JSONs
@app.route('/graphObjects/<path:path>')
def static_proxy_graphs(path):
  return send_from_directory('graphObjects', path)
