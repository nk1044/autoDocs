# Graph

Graphs are versatile data structures used to model networks such as roads, computers, and social networks. They consist of vertices (nodes) and edges (connections). This section explores core graph algorithms, their functionality, and use cases.


# 1. Dijkstra's Algorithm

**Purpose:** Find the shortest path from a single source to all other vertices in a graph with **non-negative edge weights**.

**When to Use:** Use when all edge weights are non-negative and you need the shortest path from one source to all nodes.

```cpp
priority_queue<pair<int, int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
vector<int> dist(n, INT_MAX);
dist[src] = 0;
pq.push({0, src});

while(!pq.empty()){
    auto [d, node] = pq.top(); pq.pop();
    for(auto [nbr, wt]: adj[node]){
        if(d + wt < dist[nbr]){
            dist[nbr] = d + wt;
            pq.push({dist[nbr], nbr});
        }
    }
}
```

**Time Complexity:** `O(E log V)` using a min-heap.


# 2. Bellman-Ford Algorithm

**Purpose:** Find shortest paths from a single source in graphs that may have **negative edge weights** Works with only directed graph.

**When to Use:** Use when the graph may contain negative weights. Can also detect **negative cycles**.

```cpp
vector<int> dist(n, INT_MAX);
dist[src] = 0;
for(int i = 0; i < n - 1; ++i){
    for(auto [u, v, w]: edges){
        if(dist[u] != INT_MAX && dist[u] + w < dist[v]){
            dist[v] = dist[u] + w;
        }
    }
}
```

**Time Complexity:** `O(VE)`


# 3. Floyd-Warshall Algorithm

**Purpose:** All-pairs shortest path.

**When to Use:** When you need the shortest path between **every pair** of nodes and the graph has **positive or negative weights (no negative cycles)**.

```cpp
for(int k = 0; k < n; ++k)
    for(int i = 0; i < n; ++i)
        for(int j = 0; j < n; ++j)
            if(dist[i][k] != INF && dist[k][j] != INF)
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
```

**Time Complexity:** `O(V^3)`


# 4. Prim's Algorithm

**Purpose:** Find Minimum Spanning Tree (MST) using greedy approach.

**When to Use:** Use when you need to construct a tree that connects all vertices with minimum total edge weight.

```cpp
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
vector<bool> visited(n, false);
pq.push({0, 0});
int mst_weight = 0;

while(!pq.empty()){
    auto [wt, u] = pq.top(); pq.pop();
    if(visited[u]) continue;
    visited[u] = true;
    mst_weight += wt;

    for(auto [v, w]: adj[u])
        if(!visited[v])
            pq.push({w, v});
}
```

**Time Complexity:** `O(E log V)`


# 5. Kruskal's Algorithm

**Purpose:** Find Minimum Spanning Tree (MST) using Union-Find.

**When to Use:** Use when the graph is edge-centric (edge list format). Suitable for sparse graphs.

```cpp
sort(edges.begin(), edges.end());
vector<int> parent(n), rank(n, 0);
iota(parent.begin(), parent.end(), 0);

function<int(int)> find = [&](int x){
    return parent[x] = (parent[x] == x ? x : find(parent[x]));
};

int mst_weight = 0;
for(auto [u, v, wt]: edges){
    int pu = find(u), pv = find(v);
    if(pu != pv){
        mst_weight += wt;
        if(rank[pu] < rank[pv]) swap(pu, pv);
        parent[pv] = pu;
        if(rank[pu] == rank[pv]) rank[pu]++;
    }
}
```

**Time Complexity:** `O(E log E)`


# 6. Topological Sort

**Purpose:** Linear ordering of nodes such that for every directed edge u → v, u comes before v.

**When to Use:** Used for scheduling, task ordering, etc. Works only on **DAGs** (Directed Acyclic Graphs).

```cpp
vector<int> indegree(n, 0);
for(auto u: graph)
    for(auto v: u)
        indegree[v]++;

queue<int> q;
for(int i = 0; i < n; ++i)
    if(indegree[i] == 0)
        q.push(i);

vector<int> topo;
while(!q.empty()){
    int node = q.front(); q.pop();
    topo.push_back(node);
    for(auto v: graph[node]){
        if(--indegree[v] == 0)
            q.push(v);
    }
}
```

**Time Complexity:** `O(V + E)`


# 7. Kosaraju's Algorithm

**Purpose:** Find all **Strongly Connected Components (SCCs)** in a directed graph.

**When to Use:** Useful in compiler optimization, deadlock detection, and finding cyclic dependencies.

Steps:
1. Do a DFS and store nodes in postorder.
2. Reverse the graph.
3. DFS in the order of the postorder to find SCCs.

**Time Complexity:** `O(V + E)`


# 8. Tarjan’s Algorithm

**Purpose:** Find **Strongly Connected Components (SCCs)** using a single DFS.

**When to Use:** Alternative to Kosaraju’s when stack-based DFS is more suitable.

**Time Complexity:** `O(V + E)`


# 9. Disjoint Set Union (DSU) / Union-Find

**Purpose:** Keep track of elements split into disjoint sets.

**When to Use:** Primarily used in Kruskal’s MST and problems involving connectivity checks.

**Optimizations:**
- Path Compression
- Union by Rank

```cpp
vector<int> parent(n), rank(n, 0);
iota(parent.begin(), parent.end(), 0);

int find(int x){
    return parent[x] = (parent[x] == x ? x : find(parent[x]));
}

void unite(int x, int y){
    int rx = find(x), ry = find(y);
    if(rx == ry) return;
    if(rank[rx] < rank[ry]) swap(rx, ry);
    parent[ry] = rx;
    if(rank[rx] == rank[ry]) rank[rx]++;
}
```

**Time Complexity:** `O(α(N))` per operation (inverse Ackermann function)
