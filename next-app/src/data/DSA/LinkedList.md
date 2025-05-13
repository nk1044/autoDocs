
# Linked List

A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a pointer to the next node in the sequence. Linked lists provide dynamic memory allocation and efficient insertion and deletion of elements.

# Creating a Linked List from a Vector

A linked list is a data structure where elements (nodes) are linked together using pointers. Each node consists of a data field and a pointer to the next node in the list. The given C++ program demonstrates how to create a singly linked list from a vector.

** Working Principle **

1. A class `Node` is defined with an integer data field and a pointer to the next node.
2. A constructor initializes each node with a given value and a pointer (defaulted to `nullptr`).
3. A function `createlst()` takes a vector of integers as input and constructs a linked list.
4. A new node is created for each element in the vector and linked to the previous node.
5. The head node is returned, pointing to the first element in the linked list.
6. The main function initializes a vector and calls `createlst()` to build the linked list.
7. A loop traverses the linked list, printing each node’s value.

** Code **

```cpp
class Node {
public:
    int data;
    Node* next;

public:
    Node(int a = 0, Node* next1 = nullptr) {
        data = a;
        next = next1;
    }
};

Node* createlst(vector<int> &a) {
    Node* head = new Node(a[0]);
    Node* mover = head;

    for (int i = 1; i < a.size(); i++) {
        Node* temp = new Node(a[i]);
        mover->next = temp;
        mover = temp;
    }
    return head;
}
````

** Explanation of the Code **

* **Node Class:** Defines the structure of a node in the linked list with data and a pointer.
* **Constructor:** Initializes the node with a given value and a default next pointer.
* **createlst Function:** Iterates through the vector and links each node to form a linked list.
* **Main Function:** Calls `createlst()` and traverses the linked list to print all elements.

** Time and Space Complexity Analysis **

| Operation                | Time Complexity | Reason                                                       |
| ------------------------ | --------------- | ------------------------------------------------------------ |
| Creating the linked list | O(n)            | Each element is visited once to create a node and link it.   |
| Traversing the list      | O(n)            | Each node is visited once to print its value.                |
| Overall Complexity       | O(n)            | The dominant factor is the linear traversal of `n` elements. |

Since the linked list is created dynamically using `new`, the space complexity is O(n), where `n` is the number of elements in the vector. No extra memory is used apart from the nodes themselves.

# Deleting Nodes with Specific Value in Linked List

This code implements a singly linked list with two primary operations: converting an array into a linked list and deleting nodes with a specific value. It demonstrates the use of dynamic memory allocation and pointer manipulation in C++.

** Code **

```cpp
Node* deleteNode(Node* head, int a) {
    Node* dummy = new Node(0, head);
    Node* mover = dummy;
    while (mover->next != nullptr) {
        if (mover->next->data == a) {
            Node* temp = mover->next;
            mover->next = mover->next->next;
            delete temp;
        } else {
            mover = mover->next;
        }
    }
    Node* Newhead = dummy->next;
    delete dummy;
    return Newhead;
}
```

** Time and Space Complexity **

| Operation                    | Time Complexity | Space Complexity |
| ---------------------------- | --------------- | ---------------- |
| Convert array to linked list | **O(n)**        | **O(n)**         |
| Delete specific value nodes  | **O(n)**        | **O(1)**         |

** Explanation of Complexity **

* **Convert array to linked list:** Each element in the array is iterated over once and allocated dynamically, making it O(n) time and space complexity.
* **Delete specific value nodes:** Each node is traversed once, so the time complexity is O(n). Space complexity is O(1) because we only use a few additional pointers and do not allocate extra memory apart from the modified list.
