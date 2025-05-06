# Searching in DSA

Searching is a fundamental concept in computer science that involves finding a particular value or element within a data structure. The two main types of searching algorithms are: **Linear Search** and **Binary Search**.

---

# Binary Search

Binary search is an efficient searching algorithm that works on sorted arrays. It follows the divide-and-conquer approach by repeatedly dividing the search space in half until the target element is found or the search space is empty.

### Binary Search Algorithm Steps:

1. Find the middle element of the array.
2. If the middle element is the target, return its index.
3. If the target is smaller than the middle element, search in the left half.
4. If the target is greater than the middle element, search in the right half.
5. Repeat the process until the element is found or the search space is empty.

```cpp
// Binary search function
int binarySearch(int value, int left, vector<int>& nums) {
    int n = nums.size();
    int right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == value) return mid; // Element found
        else if (value < nums[mid]) right = mid - 1; // Search left half
        else left = mid + 1; // Search right half
    }
    return -1; // Element not found
}
````

| Complexity Type                  | Time Complexity |
| -------------------------------- | --------------- |
| Best Case (Element found at mid) | O(1)            |
| Average Case                     | O(log n)        |
| Worst Case (Element not found)   | O(log n)        |

**Space Complexity:** O(1) for iterative binary search since it does not use extra space apart from variables. If a recursive approach is used, the space complexity becomes O(log n) due to recursive stack calls.
