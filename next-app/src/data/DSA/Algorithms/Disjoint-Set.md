# Disjoint Set (Union-Find)

A **Disjoint Set** (also known as Union-Find) is a data structure that keeps track of a **partition of elements into disjoint (non-overlapping) sets**.

It supports two main operations efficiently:

1. **Find (find_Ulp)**: Determines the "ultimate parent" (representative) of the set that an element belongs to.
2. **Union (UnionSet)**: Merges two disjoint sets into one.

This data structure is widely used in problems related to:

* **Connected components** in graphs
* **Kruskal's algorithm** for Minimum Spanning Tree
* **Cycle detection**


# Optimizations

The implementation uses two key optimizations to make operations nearly constant time:

* **Path Compression** (in `find_Ulp`): Flattens the tree structure to make future queries faster.
* **Union by Rank** (in `UnionSet`): Always attach the smaller tree under the larger one to keep the tree shallow.


# Code with Detailed Comments

```cpp

class DisjointSet {
    vector<int> parent; // Stores the parent of each node
    vector<int> rank;   // Rank represents the approximate depth of trees

public:
    // Constructor to initialize disjoint sets of size n
    DisjointSet(int n) {
        parent.resize(n);
        rank.resize(n, 0); // Initially, all ranks are 0

        // Initially, each node is its own parent (self loop)
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    // Find the ultimate parent (representative) of a node
    // Uses path compression to flatten the tree
    int find_Ulp(int node) {
        if (node == parent[node]) {
            return node;
        }
        // Recursively find the root and compress the path
        return parent[node] = find_Ulp(parent[node]);
    }

    // Union operation by rank
    // Merges the sets containing u and v
    void UnionSet(int u, int v) {
        int ulp_u = find_Ulp(u); // Ultimate parent of u
        int ulp_v = find_Ulp(v); // Ultimate parent of v

        // If they are already in the same set, do nothing
        if (ulp_u == ulp_v) {
            return;
        }

        // Attach the smaller tree under the larger one
        if (rank[ulp_u] < rank[ulp_v]) {
            parent[ulp_u] = ulp_v;
        } else if (rank[ulp_u] > rank[ulp_v]) {
            parent[ulp_v] = ulp_u;
        } else {
            // If both have the same rank, choose one as root and increase its rank
            parent[ulp_u] = ulp_v;
            rank[ulp_v]++;
        }
    }
};
```


# Example Use Case

```cpp
int main() {
    DisjointSet ds(5);

    ds.UnionSet(0, 2);
    ds.UnionSet(4, 2);
    ds.UnionSet(3, 1);

    // Check if 4 and 0 belong to the same set
    if (ds.find_Ulp(4) == ds.find_Ulp(0)) {
        cout << "Same set\n";
    } else {
        cout << "Different sets\n";
    }
}
```


# Summary

| Operation  | Time Complexity                                       |
| ---------- | ----------------------------------------------------- |
| `find_Ulp` | **O(α(n))** — almost constant due to path compression |
| `UnionSet` | **O(α(n))** — nearly constant due to union by rank    |

Where **α(n)** is the **inverse Ackermann function** — grows extremely slowly, making these operations nearly constant time in practice.
