# Minimum Spanning Tree (MST)

## What is an MST?

A **Minimum Spanning Tree** of a connected, undirected, weighted graph is a **subset of edges** that:

* Connects all vertices together (i.e., it's a spanning tree),
* Has **no cycles**,
* Has the **minimum total edge weight** among all possible spanning trees.


## MST Use Cases

* Network design (e.g., laying cables or pipes),
* Clustering algorithms,
* Approximation algorithms (e.g., for TSP).


# Kruskal's Algorithm

## Idea:

Kruskal’s Algorithm builds the MST by:

1. **Sorting all edges** in ascending order of weight.
2. **Adding edges one by one** to the MST, but **only if** they don’t form a cycle.
3. Cycles are avoided using the **Disjoint Set (Union-Find)** data structure.


## Required Components

* A list of **all edges**, sorted by weight.
* A **Disjoint Set** to check if adding an edge forms a cycle.


## Link to Disjoint Set:

For the Disjoint Set (Union-Find) class used here, see [Disjoint Set Code](https://docswrite.vercel.app/docs/DSA/Algorithms/Disjoint-Set.md#DSA/Algorithms/Disjoint-Set.md-heading-11)


## Kruskal’s Algorithm in C++

```cpp
// adj[i] = vector of {neighbor, weight}
int Kruskals(vector<vector<vector<int>>>& adj) {
    int vertices = adj.size();
    DisjointSet ds(vertices);  // Disjoint set to manage connected components

    // Min-heap to sort edges by weight: {weight, {u, v}}
    priority_queue< pair<int, pair<int, int>>, 
                    vector<pair<int, pair<int, int>>>,
                    greater<pair<int, pair<int, int>>> > pq;

    // Add all edges to the priority queue
    for (int i = 0; i < vertices; i++) {
        for (auto& neighbor : adj[i]) {
            int adjNode = neighbor[0];
            int weight = neighbor[1];

            // To avoid duplicate undirected edges (u-v and v-u), only add if u < v
            if (i < adjNode) {
                pq.push({weight, {i, adjNode}});
            }
        }
    }

    int mstWeight = 0;
    int edgesUsed = 0;

    // Process edges in increasing order of weight
    while (!pq.empty() && edgesUsed < vertices - 1) {
        int weight = pq.top().first;
        int u = pq.top().second.first;
        int v = pq.top().second.second;
        pq.pop();

        // If u and v belong to different components, add this edge
        if (ds.find_Ulp(u) != ds.find_Ulp(v)) {
            ds.UnionSet(u, v);     // Merge the two sets
            mstWeight += weight;   // Add edge to MST
            edgesUsed++;           // Track the number of edges added
        }
    }

    // If MST was not possible (disconnected graph)
    if (edgesUsed != vertices - 1) return -1;

    return mstWeight;
}
```


## Explanation of Key Parts

| Component                          | Description                                                |
| ---------------------------------- | ---------------------------------------------------------- |
| `priority_queue`                   | A min-heap used to get the edge with the smallest weight.  |
| `DisjointSet ds(vertices)`         | Initializes a disjoint set for `vertices` number of nodes. |
| `ds.find_Ulp(u) != ds.find_Ulp(v)` | Checks if `u` and `v` are in different components.         |
| `ds.UnionSet(u, v)`                | Merges the two components to form a larger tree.           |
| `edgesUsed`                        | Ensures we stop when the MST has `V - 1` edges.            |


## Important Notes:

* This version avoids **duplicate edges** in undirected graphs by checking `i < adjNode`.
* The MST **only exists** if the graph is **connected** — otherwise, the function returns `-1`.

## Time complexity:
  **O(E log E)** for sorting edges using the priority queue.
  **O(α(V))** per union/find using Disjoint Set (with path compression + rank).


## Sample Use

```cpp
int main() {
    vector<vector<vector<int>>> adj = {
        {{1, 2}, {3, 6}},
        {{0, 2}, {2, 3}, {3, 8}, {4, 5}},
        {{1, 3}, {4, 7}},
        {{0, 6}, {1, 8}},
        {{1, 5}, {2, 7}}
    };

    int result = Kruskals(adj);
    cout << "Minimum Spanning Tree Weight: " << result << endl;
    return 0;
}
```

Here’s a **clear, detailed, and improved version** of the notes for **Prim’s Algorithm** along with a properly commented C++ implementation. This includes a deeper explanation, a cleaner structure, and formatting for better readability.


# Prim’s Algorithm

## What is Prim’s Algorithm?

**Prim’s Algorithm** is a **greedy algorithm** that finds a **Minimum Spanning Tree (MST)** for a connected, undirected, weighted graph.
It builds the MST by **growing one vertex at a time**, always choosing the **lowest-weight edge** that connects a vertex **inside** the MST to a vertex **outside** it.


## Time & Space Complexity

* **Time Complexity**: `O(E log V)` using a **min-heap (priority queue)**, `E` = number of edges, `V` = number of vertices
* **Space Complexity**: `O(V)` for arrays


## Why It Works

The algorithm always extends the MST using the **smallest weight edge** that connects a new vertex to the MST. This ensures a **locally optimal choice** at each step, leading to a **globally optimal MST**.


## C++ Implementation

```cpp
// adj[i] = vector of {node, weight}
int Prims(vector<vector<vector<int>>>&adj){
    int n = adj.size();
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    vector<bool> visited(n, false);
    
    // {weight, node}
    pq.push({0, 0});
    int mst_weight = 0;

    while(!pq.empty()){
        auto [wt, u] = pq.top(); 
        pq.pop();
        if(visited[u]) continue;
        visited[u] = true;
        mst_weight += wt;

        for(auto [v, w]: adj[u])
            if(!visited[v])
                pq.push({w, v});
    }
    return mst_weight;
}
```

