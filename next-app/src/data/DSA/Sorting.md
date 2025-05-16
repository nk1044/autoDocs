# Sorting Algorithms

Sorting is a fundamental operation in computer science that involves arranging elements in a specific order (ascending or descending). Various sorting algorithms have different time complexities, space requirements, and use cases. Some common sorting algorithms include Bubble Sort, Merge Sort, Quick Sort, and Heap Sort.


# Merge Sort

Merge Sort is a divide-and-conquer sorting algorithm that splits an array into smaller subarrays, sorts them recursively, and then merges them back together. It is stable and guarantees O(n log n) performance in all cases.

## Steps of Merge Sort:**

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

# Insertion Sort

Insertion Sort is a simple and intuitive sorting algorithm that builds the sorted array one element at a time. It works similarly to how we sort playing cards in our hands. The algorithm iterates through the list and places each element in its correct position relative to the already sorted part of the array.

## Working Principle:**

1. Start with the second element (index 1) and compare it with the previous elements.
2. If the current element is smaller than the previous ones, shift the larger elements to the right.
3. Insert the current element in its correct position.
4. Repeat for all elements until the array is sorted.

```cpp

void InsertionSort(vector<int>&nums){
//pick an element and insert it in its right palce
  for(int i=1;i<nums.size();i++){
    int j=i-1;
    while(j>=0 && nums[j]>nums[j+1]){
      swap(nums[j+1], nums[j]);
      j--;
    }
    Print(nums);
  }
}

```

## Step-by-Step Explanation:**


* The outer loop iterates over each element from index 1 to the end.
* The inner loop shifts elements that are greater than the current element to the right.
* The `swap()` function is used to place the current element in the correct position.

| Case                              | Time Complexity |
| --------------------------------- | --------------- |
| Best Case (Already Sorted Input)  | O(n)            |
| Worst Case (Reverse Sorted Input) | O(n²)           |
| Average Case                      | O(n²)           |

* **Space Complexity:## **O(1)**, as no extra space is used apart from the input array.


# Radix Sort

**Radix Sort** is a non-comparative integer sorting algorithm. It processes the digits of numbers from the least significant digit (LSD) to the most significant digit (MSD).

## Use Case 

* Works best on integers or fixed-length strings.
* Time complexity: `O(nk)` where `n` is number of elements and `k` is the number of digits.

## How It Works: 

1. Find the maximum number to know the number of digits.
2. Start from the least significant digit and use **Counting Sort** as a subroutine to sort by that digit.
3. Repeat for all digit positions.

## Code Example (C++) 

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// A utility function to get the digit at a given place
int getDigit(int number, int place) {
    return (number / place) % 10;
}

// Counting sort based on digit at 'place'
void countingSort(vector<int>& arr, int place) {
    int n = arr.size();
    vector<int> output(n);
    int count[10] = {0};

    for (int i = 0; i < n; i++)
        count[getDigit(arr[i], place)]++;

    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (int i = n - 1; i >= 0; i--) {
        int digit = getDigit(arr[i], place);
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    arr = output;
}

void radixSort(vector<int>& arr) {
    int maxNum = *max_element(arr.begin(), arr.end());

    for (int place = 1; maxNum / place > 0; place *= 10)
        countingSort(arr, place);
}

// Example usage
int main() {
    vector<int> arr = {170, 45, 75, 90, 802, 24, 2, 66};
    radixSort(arr);
    for (int num : arr)
        cout << num << " ";
    return 0;
}
```

# Bucket Sort

**Bucket Sort** distributes elements into several "buckets", sorts each bucket (often with another sorting algorithm like insertion sort), and then concatenates them.

## Use Case 

* Best for uniformly distributed floating point numbers in \[0, 1).
* Time complexity: `O(n + k)`, where `k` is the number of buckets (usually ≈ `n`).

## How It Works:**

1. Create empty buckets.
2. Distribute input numbers into buckets.
3. Sort each bucket individually.
4. Concatenate all buckets.

## Code Example (C++) 

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void bucketSort(vector<float>& arr) {
    int n = arr.size();
    vector<vector<float>> buckets(n);

    // Distribute elements into buckets
    for (float num : arr) {
        int index = num * n; // index in range [0, n-1]
        buckets[index].push_back(num);
    }

    // Sort each bucket
    for (int i = 0; i < n; i++)
        sort(buckets[i].begin(), buckets[i].end());

    // Concatenate all buckets
    int idx = 0;
    for (const auto& bucket : buckets) {
        for (float num : bucket)
            arr[idx++] = num;
    }
}

// Example usage
int main() {
    vector<float> arr = {0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434};
    bucketSort(arr);
    for (float num : arr)
        cout << num << " ";
    return 0;
}
```

