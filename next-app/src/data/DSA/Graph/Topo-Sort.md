# Topological sorting:-
this ordering only exists in directed ascyclic graphs.
any linear ordering of nodes such that Vi appears before Ui if there an edges between Vi->Ui.

# code:-

```cpp
void dfs(vector<vector<int>>&adj, int node, stack<int>&st, vector<bool>&vis){
    vis[node]=true;
    for(auto it:adj[node]){
        if(!vis[it]){
            dfs(adj, it, st, vis);
        }
    }
    st.push(node);
}


vector<int>solve(vector<vector<int>>&adj){
    int n = adj.size();
    vector<bool>vis(n, false);
    stack<int>st;
    dfs(adj, )
    for(int i=0;i<n;i++){
        if(!vis[i])dfs(adj, i, st, vis);
    }
    vector<int>ans;
    while(!st.empty()){
        ans.push_back(st.top());
        st.pop();
    }
    return ans;
}
```

# Kahn's Algorithm (BFS):
here we use modified bfs.
1. `Indegree`:- array containing number of incomming edges to a node.
find the source nodes (indegree[i]==0). insert all source nodes to a queue.


## cpp code:-
```cpp
vector<int> topoSort(vector<vector<int>>&edges, int n){
    vector<int>indegree(n, 0);
    vector<vector<int>>adj(n);
    for(auto [u, v]: edges){
        indegree[v]++;
        adj[u].push_back(v);
    }
    queue<int>q;
    for(int i=0;i<n;i++){
        if(indegree[i]==0)q.push(i);
    }
    vector<int>ans;
    while(!q.empty()){
        int node = q.front();
        q.pop();
        ans.push_back(node);
        for(auto it: adj[node]){
            indegree[it]--;
            if(indegree[it]==0)q.push(it);
        }
    }
    reverse(ans.begin(), ans.end());
    return ans;
}

```

## Cycle detection:
kahn's algorithme can also be used to detect cycles in DAGs. because in a cycle there will not be any node whose indegree will become `0`. so you just have to check if the size of the `topo` array is same as number of nodes or not at last.
if it is not same then that means there is a cycle in the graph.


