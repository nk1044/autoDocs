# 1. Number of Unique Binary Trees with `n` Nodes (Unlabeled Nodes)

This is given by the **Catalan number**:

![image](https://i.postimg.cc/FzsN02dS/Screenshot-2025-07-02-at-5-21-58-PM.png)

This counts the number of **unique binary tree structures** (regardless of node values).

** ✔️ This is also the number of full binary trees, balanced bracket sequences, and many other combinatorial structures.**

# What is the Catalan Number?

The Catalan numbers form a sequence:

```
C₀ = 1, C₁ = 1, C₂ = 2, C₃ = 5, C₄ = 14, C₅ = 42, ...
```

## Recurrence Relation:

![image](https://i.postimg.cc/wvQPz2xT/Screenshot-2025-07-02-at-5-31-00-PM.png)

## Catalan Number Applications:

* Number of valid parenthesis expressions with `n` pairs
* Number of full binary trees with `n` internal nodes
* Number of ways to triangulate a polygon with `n+2` sides
* Number of BSTs (Binary Search Trees) with `n` distinct keys
* Number of paths along a grid that do not cross the diagonal


# 2. Number of Unique Binary Trees with `n` Labeled Nodes

When node values are distinct (labels matter), each tree structure can be labeled in `n!` ways.

So total labeled binary trees:

![image](https://i.postimg.cc/JnKcTknF/Screenshot-2025-07-02-at-5-24-41-PM.png)

** This is useful in algorithm analysis, counting BSTs, and probabilistic models in computer science. **


# Summary Table

| Type                              | Nodes | Formula                             | Example (`n = 3`) |
| --------------------------------- | ----- | ----------------------------------- | ----------------- |
| Unlabeled Binary Trees            | `n`   | $C_n = \frac{1}{n+1} \binom{2n}{n}$ | $C_3 = 5$         |
| Labeled Binary Trees              | `n`   | $C_n \cdot n!$                      | $5 \cdot 3! = 30$ |
| Labeled Binary Search Trees (BST) | `n`   | $C_n$                               | $C_3 = 5$         |


# References for Further Reading

* [Catalan Numbers - OEIS A000108](https://oeis.org/A000108)
* [Wikipedia: Catalan Number](https://en.wikipedia.org/wiki/Catalan_number)
* [Binary Trees and Combinatorics (Stanford Lecture)](https://web.stanford.edu/class/archive/cs/cs103/cs103.1196/lectures/16/Slides16.pdf)


