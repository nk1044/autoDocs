# Dijkstra's Algorithm

Dijkstra's Algorithm is a greedy algorithm used to find the **shortest paths from a single source node to all other nodes** in a **weighted graph** with **non-negative edge weights**.


## 1. Weighted Directed Graphs
The algorithm respects edge directions. It computes shortest paths following the directed edges and their respective weights.

## 2. Weighted Undirected Graphs
 Each edge is considered bidirectional with the **same weight** in both directions.

## Key Conditions
**Does NOT work with `negative edge` weights** — it can produce incorrect results.


## Algorithm Overview

* Uses a **priority queue (min-heap)** to always pick the next closest node.
* Maintains a `dist[]` array where `dist[i]` is the minimum distance from the source to node `i`.
* Updates neighbors only if a **shorter path** is found.

## C++ Implementation

```cpp
// adj[node] = vector of {neighbor, weight}
void dijkstra(const vector<vector<vector<int>>>& adj, int& source) {
    int vertices = adj.size();
    vector<int> dist(vertices, INT_MAX); // Initialize distances to infinity

    // Min-heap priority queue: {distance, node}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> q;

    dist[source] = 0;
    q.push({0, source});

    while (!q.empty()) {
        auto [current_dist, node] = q.top();
        q.pop();

        // Traverse all adjacent nodes
        for (const auto& edge : adj[node]) {
            int neighbor = edge[0];
            int weight = edge[1];

            // If a shorter path is found
            if (current_dist + weight < dist[neighbor]) {
                dist[neighbor] = current_dist + weight;
                q.push({dist[neighbor], neighbor});
            }
        }
    }

}
```


# Bellman-Ford Algorithm

The **Bellman-Ford Algorithm** is used to find the **shortest paths from a single source** to all vertices in a **weighted graph**, including graphs with **negative edge weights**.

## Time and Space Complexity

* **Time Complexity**: `O(V * E)`, Loops over all `E` edges for `V-1` iterations.
* **Space Complexity**: `O(V)`, For the `dist[]` array.


## Key Features

* **Handles negative edge weights** safely.
* **Detects negative weight cycles** (where the total weight of a cycle is negative).
* Works on **directed graphs**.
* Can be adapted to undirected graphs by adding both directions as separate edges.
* If a vertex’s distance can still be reduced **after V-1 relaxations**, it means there's a **negative weight cycle**, and the algorithm **reports it** (instead of providing a potentially invalid distance result).
* **Does not require a priority queue** (unlike Dijkstra).


## Algorithm Logic

* Initialize distances from the source to all other vertices as infinity.
* Relax all edges `V - 1` times, For every edge `u → v` with weight `w`, update `dist[v]` if `dist[u] + w < dist[v]`.
* After the relaxations, loop once more through all edges to check for further distance updates, If any update is possible, a **negative cycle exists**.


## C++ Implementation

```cpp
// edges[i] = {from, to, weight}
vector<int> bellmanFord(int vertices, const vector<vector<int>>& edges, int source) {
    vector<int> dist(vertices, 1e8); // Distance initialized to "infinity"
    dist[source] = 0;

    // Step 1: Relax all edges V-1 times
    for (int i = 0; i < vertices - 1; ++i) {
        for (auto edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != 1e8 && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    // Step 2: Check for negative weight cycles
    for (const auto& edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != 1e8 && dist[u] + w < dist[v]) {
            cout << "Graph contains a negative weight cycle.\n";
            return {}; // Return empty vector if negative cycle exists
        }
    }

    return dist;
}
```



# Floyd-Warshall Algorithm

The **Floyd-Warshall Algorithm** is a classic dynamic programming algorithm used to find the **shortest paths between all pairs of vertices** in a weighted graph.

## Key Features

* Works for **directed or undirected graphs**
* Handles **positive and negative edge weights** (but **no negative cycles**)
* Produces a **distance matrix** with the shortest path between every pair of vertices

## Time and Space Complexity

* **Time Complexity:** `O(V³)` — triple nested loops for all vertex pairs and intermediate vertices
* **Space Complexity:** `O(V²)` — to store the distance matrix


## Algorithm Idea

* **Initialization**: Use a `V x V` matrix (`dist[][]`) where `dist[i][j]` is the weight of the edge from vertex `i` to `j`. If no edge exists, initialize it to a large value (e.g., `1e5`). Set `dist[i][i] = 0` for all `i` (distance from a vertex to itself is zero).
* **Core Logic**: Iterate over all vertices `k` as intermediate points. For every pair of vertices `(i, j)`, check if going through `k` gives a shorter path: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`

* **Post-processing**: Replace all unreachable values (e.g., ≥ `1e5`) with `-1` to indicate no path.


## C++ Implementation

```cpp
void FloydWarshall(vector<vector<int>>& matrix) {
    int n = matrix.size();
    const int INF = 1e5;

    // Step 1: Replace -1 with INF (unreachable)
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            if (matrix[i][j] == -1) matrix[i][j] = INF;

    // Step 2: Floyd-Warshall core loop
    for (int k = 0; k < n; ++k) {
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                if (matrix[i][k] < INF && matrix[k][j] < INF) {
                    matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]);
                }
            }
        }
    }

    // Step 3: Replace INF back with -1
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            if (matrix[i][j] >= INF) matrix[i][j] = -1;
}
```

