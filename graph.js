class Node {
  constructor(value) {
    this.value = value;
    this.edges = {};
  }
}

export class Graph {
    constructor() {
        this.nodes = {};
    }

    contains(value) {
        return Boolean(this.nodes[value]);
    }
    
    addNode(value) {
        if (this.contains(value)) {
            return false;
        }
        this.nodes[value] = new Node(value);
        return true;
    }
    
    removeNode(value) {
        if (!this.contains(value)) {
            return false;
        }
        delete this.nodes[value];
        for (let node in this.nodes) {
            if (this.nodes[node].edges[value]) {
                delete this.nodes[node].edges[value];
            }
        }
        return true;
    }
    
    addEdge(value1, value2, weight) {
        if (!this.contains(value1) || !this.contains(value2)) {
            return false;
        }
        this.nodes[value1].edges[value2] = weight;
        this.nodes[value2].edges[value1] = weight;
        return true;
    }
    
    removeEdge(value1, value2) {
        if (!this.contains(value1) || !this.contains(value2)) {
            return false;
        }
        delete this.nodes[value1].edges[value2];
        delete this.nodes[value2].edges[value1];
        return true;
    }
    
    hasEdge(value1, value2) {
        if (!this.contains(value1) || !this.contains(value2)) {
            return false;
        }
        return Boolean(this.nodes[value1].edges[value2]);
    }
    
    forEachNode(cb) {
        for (let node in this.nodes) {
            cb(this.nodes[node]);
        }
    }

    bfs(start_node, target_node) {
        const start = String(start_node);
        const target = String(target_node);
        const paths = [];
        const queue = [start];

        // We will use a queue to keep track of the paths we are exploring
        while(queue.length) {
            const path = queue.shift();
            const node = path[path.length - 1];
            // console.log("Node: ", node, "\nPath: ", path, "\nQueue: ", queue, "Paths: ", paths);
            if (node === target) {
                paths.push(path);
            } else {
                for (let neighbor in this.nodes[node].edges) {
                    if (!path.includes(neighbor)) {
                        queue.push([...path, neighbor]);
                    }
                }
            }
        }
        // console.log("PATHS: ", paths);
        return paths;
    }

    print() {
        for (let node in this.nodes) {
            console.log("Node: ", node, " Edges: ", this.nodes[node].edges);
        }
    }

    shortestPath(start_node, target_node) {
        const paths = this.bfs(start_node, target_node);
        console.log("Total path number: ", paths.length);
        // Map the paths to sum of their weights
        const path_weights = paths.map(path => {
            let sum = 0;
            for (let i = 0; i < path.length - 1; i++) {
                sum += this.nodes[path[i]].edges[path[i + 1]];
            }
            return sum;
        });

        const shortest_path_index = path_weights.indexOf(Math.min(...path_weights));
        
        return paths[shortest_path_index];
    }
}