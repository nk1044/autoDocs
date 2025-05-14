
# Binary Tree

A binary tree is a hierarchical data structure where each node has at most two children. Tree traversal refers to the process of visiting each node in a tree systematically. The common traversal techniques are **preorder, inorder, postorder, and level order traversals**.

```cpp
class Node {
    public:
    int data;
    Node* left;
    Node* right;

    public:
    Node(int a = 0, Node* left1 = nullptr, Node* right1 = nullptr){
        data = a;
        left = left1;
        right = right1;
    }
};
````

Each node in a binary tree contains data and pointers to left and right child nodes. The following functions demonstrate different traversal techniques.

| Traversal Type | Order of Nodes Visited     |
| -------------- | -------------------------- |
| Preorder       | Root → Left → Right        |
| Inorder        | Left → Root → Right        |
| Postorder      | Left → Right → Root        |
| Level Order    | Visit nodes level by level |

Now, let us explore each traversal with its respective time and space complexity.


# Preorder Traversal (Recursive)

Preorder traversal visits the root first, followed by the left and right subtrees.

```cpp
void preorder(Node* root){
    if(root == nullptr){
        return;
    }
    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}
```

**Time Complexity:## O(n) because each node is visited once.
**Space Complexity:## O(h), where h is the height of the tree due to recursive calls in the call stack.

---

# Inorder Traversal (Recursive) 

Inorder traversal visits the left subtree first, then the root, and finally the right subtree.

```cpp
void Inorder(Node* root){
    if(root == nullptr){
        return;
    }
    Inorder(root->left);
    cout << root->data << " ";
    Inorder(root->right);
}
```

**Time Complexity:## O(n) since each node is visited once.
**Space Complexity:## O(h) for the recursive function calls in the stack.

---

# Postorder Traversal (Recursive)

Postorder traversal first visits the left and right subtrees, then the root.

```cpp
void postorder(Node* root){
    if(root == nullptr){
        return;
    }
    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}
```

**Time Complexity:## O(n) as each node is processed once.
**Space Complexity:## O(h) due to recursion depth.

---

# Level Order Traversal (Using Queue)

Level order traversal processes nodes level by level using a queue.

```cpp
vector<vector<int>> LevelOrder(Node* root){
    vector<vector<int>> ans;
    if(root == nullptr) return ans;
    
    queue<Node*> q;
    q.push(root);
    while(!q.empty()){
        int n = q.size();
        vector<int> level;
        for(int i = 0; i < n; i++){
            Node* node = q.front();
            q.pop();
            if(node->left != nullptr) q.push(node->left);
            if(node->right != nullptr) q.push(node->right);
            level.push_back(node->data);
        }
        ans.push_back(level);
    }
    return ans;
}
```

**Time Complexity:## O(n) since all nodes are visited once.
**Space Complexity:## O(n) as we use a queue to store nodes.

---

# Iterative Preorder Traversal

Iterative versions of these traversals are implemented using stacks to simulate recursion.

```cpp
vector<int> preorderIterative(Node* root) {
    vector<int> result;
    if (root == nullptr) return result;
    stack<Node*> s;
    s.push(root);
    while (!s.empty()) {
        Node* node = s.top(); s.pop();
        result.push_back(node->data);
        if (node->right) s.push(node->right);
        if (node->left) s.push(node->left);
    }
    return result;
}
```

In iterative preorder traversal, a stack is used to process nodes in root-left-right order.

---

# Iterative Inorder Traversal

```cpp
vector<int> inorderIterative(Node* root) {
    vector<int> result;
    stack<Node*> s;
    Node* node = root;
    while (node || !s.empty()) {
        while (node) {
            s.push(node);
            node = node->left;
        }
        node = s.top(); s.pop();
        result.push_back(node->data);
        node = node->right;
    }
    return result;
}
```

In iterative inorder traversal, a stack is used to track the leftmost nodes first.

---

# Iterative Postorder Traversal

```cpp
vector<int> postorderIterative(Node* root) {
    vector<int> result;
    if (root == nullptr) return result;
    stack<Node*> s1, s2;
    s1.push(root);
    while (!s1.empty()) {
        Node* node = s1.top(); s1.pop();
        s2.push(node);
        if (node->left) s1.push(node->left);
        if (node->right) s1.push(node->right);
    }
    while (!s2.empty()) {
        result.push_back(s2.top()->data);
        s2.pop();
    }
    return result;
}
```
Postorder traversal requires two stacks to process nodes in left-right-root order iteratively.
**Time complexity## of all traversals is O(n) as every node is visited once.
**Space complexity## is O(h), where h is the tree height, due to recursive calls or stack usage.

