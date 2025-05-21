# Graph Traversal

Graph traversal is the process of visiting all the nodes in a graph. The two primary methods are:

- **BFS (Breadth-First Search)**
- **DFS (Depth-First Search)**


# Breadth-First Search (BFS)

BFS explores nodes level by level, starting from the source node and visiting all its neighbors before moving to the next level.

## Algorithm Steps
1. Initialize an empty **queue** and a `visited[]` array to keep track of visited nodes.
2. Enqueue the starting node and mark it as visited.
3. While the queue is not empty, Dequeue the front node and For each unvisited neighbor, mark it as visited and enqueue it.

```cpp
void bfs(int src, const vector<vector<int>>& adj, vector<bool>& visited) {
    queue<int> q;
    q.push(src); // enqueue the source node
    visited[src] = true; // mark the source node as visited
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " "; // Process the node (e.g., print)

        // Visit all unvisited neighbors
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = 1;
                q.push(neighbor);
            }
        }
    }
}
````

## Time and Space Complexity

| Complexity       | Value    |
| ---------------- | -------- |
| Time Complexity  | O(V + E) |
| Space Complexity | O(V)     |

 **V** = Number of vertices (nodes), **E** = Number of edges


# Depth-First Search (DFS)

DFS explores as far as possible along a branch before backtracking. It can be implemented using recursion or an explicit stack.

## Algorithm Steps

1. Initialize a `visited[]` array to keep track of visited nodes.
2. Start from the given node, Mark the node as visited and Recursively visit all unvisited neighbors.

```cpp
void dfs(int node, const vector<vector<int>>& adj, vector<int>& visited) {
    visited[node] = true;
    cout << node << " "; // Process the node
    
    // Recursively visit all unvisited neighbors
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}
```

## Time and Space Complexity

| Complexity       | Value    |
| ---------------- | -------- |
| Time Complexity  | O(V + E) |
| Space Complexity | O(V)     |

**Note:** Space complexity becomes `O(V)` due to recursion stack in case of recursive DFS.


# Summary

| Traversal | Uses Queue/Stack  | Explores       | Suitable For                              |
| --------- | ----------------- | -------------- | ----------------------------------------- |
| BFS       | Queue             | Level by level | Finding shortest path (unweighted graphs) |
| DFS       | Stack / Recursion | Depth-wise     | Topological sort, cycle detection         |
