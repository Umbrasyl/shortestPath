import { test, expect } from "@jest/globals";
import { Graph } from "./graph.js";

test("Graph contains", () => {
    const graph = new Graph();
    expect(graph.contains(1)).toBe(false);
    graph.addNode(1);
    expect(graph.contains(1)).toBe(true);
});

test("Graph addNode", () => {
    const graph = new Graph();
    expect(graph.addNode(1)).toBe(true);
    expect(graph.addNode(1)).toBe(false);
});

test("Graph removeNode", () => {
    const graph = new Graph();
    graph.addNode(1);
    expect(graph.removeNode(1)).toBe(true);
    expect(graph.removeNode(1)).toBe(false);
});

test("Graph addEdge", () => {
    const graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    expect(graph.addEdge(1, 2, 10)).toBe(true);
    expect(graph.addEdge(1, 3, 14)).toBe(false);
});

test("Graph removeEdge", () => {
    const graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    graph.addEdge(1, 2, 10);
    expect(graph.removeEdge(1, 2)).toBe(true);
    expect(graph.removeEdge(1, 3)).toBe(false);
});

test("Graph hasEdge", () => {
    const graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    graph.addEdge(1, 2, 10);
    expect(graph.hasEdge(1, 2)).toBe(true);
    expect(graph.hasEdge(2, 1)).toBe(true);
    expect(graph.hasEdge(1, 3)).toBe(false);
});

test("Graph forEachNode", () => {
    const graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    graph.addNode(3);
    const nodes = [];
    graph.forEachNode((node) => nodes.push(node.value));
    expect(nodes).toEqual([1, 2, 3]);
});

test("Graph BFS", () => {
    const graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    graph.addNode(3);
    graph.addNode(4);
    graph.addEdge(1, 2, 10);
    graph.addEdge(1, 3, 14);
    graph.addEdge(2, 3, 14);
    graph.addEdge(2, 4, 14);
    // bfs takes a start and target node and returns all paths from start to target as an array
    const paths = graph.bfs(1, 4);
    
    expect(paths).toEqual([["1", "2", "4"], ["1", "3", "2", "4"]]);
});

test("Graph shortestPath", () => {
    const graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    graph.addNode(3);
    graph.addNode(4);
    graph.addEdge(1, 2, 10);
    graph.addEdge(1, 3, 14);
    graph.addEdge(2, 3, 14);
    graph.addEdge(2, 4, 14);
    // shortestPath takes a start and target node and returns the shortest path from start to target as an array
    const path = graph.shortestPath(1, 4);
    
    expect(path).toEqual(["1", "2", "4"]);
});
