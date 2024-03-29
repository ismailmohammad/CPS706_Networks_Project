from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS

from datetime import datetime
import networkx as nx
import matplotlib.pyplot as plt
import os

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["POST"])
def get_Input():
    startNode = request.form["startNode"]; 
    endNode = request.form["endNode"];
    routingAlgorithm = request.form["routingAlgorithm"].lower();
    hosts = ('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8')
    if (startNode not in hosts or endNode not in hosts):
        return "<p>Invalid host. Ensure host is from h1 to h8.</p>";
    if routingAlgorithm == "centralized":
        os.system(f'python djikstra.py {startNode} {endNode}')
    else:
        os.system(f'python bellman_ford.py {startNode} {endNode}')
    animationGifPath = 'animation.gif';
    return animationGifPath;

@app.route('/gif/<path:path>')
def static_proxy(path):
  return send_from_directory('gif', path)
