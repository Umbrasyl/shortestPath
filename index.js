import { Graph } from "./graph.js";

const GRAPH_SIZE = 10;
const MAX_EDGES = 4;
const MIN_EDGES = 2;

function main() {
    const graph = new Graph();
    for (let i = 0; i < GRAPH_SIZE; i++) {
        graph.addNode(i);
    }
    for (let i = 0; i < GRAPH_SIZE; i++) {
        const edges = Math.floor(Math.random() * (MAX_EDGES - 1)) + MIN_EDGES;
        for (let j = 0; j < edges; j++) {
            const edge = Math.floor(Math.random() * GRAPH_SIZE);
            graph.addEdge(i, edge, Math.floor(Math.random() * 20) + 1);
        }
    }
    graph.print();

    // Find the shortest path between two arbitrary nodes

    let start = 0;
    let target = 0;
    while (target === start) {
        start = Math.floor(Math.random() * GRAPH_SIZE);
        target = Math.floor(Math.random() * GRAPH_SIZE);
    }

    console.log("Start: ", start, "\nTarget: ", target);
    console.log("Shortest Path: ", graph.shortestPath(start, target));

}

main();