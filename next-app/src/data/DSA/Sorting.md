# Sorting Algorithms

Sorting is a fundamental operation in computer science that involves arranging elements in a specific order (ascending or descending). Various sorting algorithms have different time complexities, space requirements, and use cases. Some common sorting algorithms include Bubble Sort, Merge Sort, Quick Sort, and Heap Sort.

---

# Sorting: Merge Sort

Merge Sort is a divide-and-conquer sorting algorithm that splits an array into smaller subarrays, sorts them recursively, and then merges them back together. It is stable and guarantees O(n log n) performance in all cases.

### Steps of Merge Sort:

1. Divide: Split the array into two halves until each half contains a single element.
2. Conquer: Recursively sort each half.
3. Combine: Merge the sorted halves back together.

```cpp
// Merging two sorted halves
void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    vector<int> leftArr(n1), rightArr(n2);
    
    for (int i = 0; i < n1; ++i)
        leftArr[i] = arr[left + i];
    for (int i = 0; i < n2; ++i)
        rightArr[i] = arr[mid + 1 + i];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            ++i;
        } else {
            arr[k] = rightArr[j];
            ++j;
        }
        ++k;
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        ++i;
        ++k;
    }
    while (j < n2) {
        arr[k] = rightArr[j];
        ++j;
        ++k;
    }
}

// Recursive Merge Sort Function
void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
```

The Merge Sort algorithm follows a recursive approach. The array is split into two halves until each half has only one element. Then, the merging step sorts and combines these halves efficiently. This ensures that the sorting process remains efficient and stable.

| Complexity       | Best       | Average    | Worst      |
| ---------------- | ---------- | ---------- | ---------- |
| Time Complexity  | O(n log n) | O(n log n) | O(n log n) |
| Space Complexity | O(n)       | O(n)       | O(n)       |

**Time Complexity Analysis:**

* The array is divided into two halves log(n) times.
* Merging each level requires O(n) operations.
* Therefore, the total complexity is O(n log n).

---

# Sorting: Insertion Sort

Insertion Sort is a simple and intuitive sorting algorithm that builds the sorted array one element at a time. It works similarly to how we sort playing cards in our hands. The algorithm iterates through the list and places each element in its correct position relative to the already sorted part of the array.

### Working Principle:

1. Start with the second element (index 1) and compare it with the previous elements.
2. If the current element is smaller than the previous ones, shift the larger elements to the right.
3. Insert the current element in its correct position.
4. Repeat for all elements until the array is sorted.

```cpp
#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

int main(){
    vector<int> v(10, 0);
    
    cout << "Enter 10 elements:\n";
    for(int i = 0; i < 10; i++){
        cin >> v[i];
    }
    
    for(int i = 1; i < 10; i++){
        int j = i;
        while(j > 0 && v[j] < v[j - 1]){
            swap(v[j], v[j - 1]);
            j--;
        }
    }
    
    cout << "Sorted array: ";
    for(int i = 0; i < 10; i++){
        cout << v[i] << " ";
    }
    return 0;
}
```

### Step-by-Step Explanation:

* A vector `v` of size 10 is created to store input elements.
* The user inputs 10 numbers into the vector.
* The outer loop iterates over each element from index 1 to the end.
* The inner loop shifts elements that are greater than the current element to the right.
* The `swap()` function is used to place the current element in the correct position.

| Case                              | Time Complexity |
| --------------------------------- | --------------- |
| Best Case (Already Sorted Input)  | O(n)            |
| Worst Case (Reverse Sorted Input) | O(n²)           |
| Average Case                      | O(n²)           |

* **Space Complexity:** **O(1)**, as no extra space is used apart from the input array.

```
