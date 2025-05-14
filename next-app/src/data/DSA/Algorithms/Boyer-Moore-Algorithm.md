# Boyer-Moore Voting Algorithm

The **Boyer-Moore Voting Algorithm** is a powerful and efficient method used to find the **majority element** in a sequence. A **majority element** is an element that appears more than ⌊n / 2⌋ times in an array of size `n`. This algorithm runs in **O(n)** time with **O(1)** space, making it very efficient.


# Algorithm Intuition

The algorithm works in two main phases:

1. **Candidate Selection**: Traverse the array to find a possible candidate for the majority element.
2. **Candidate Verification**: Verify whether the candidate actually occurs more than n / 2 times.

# Core Idea

If you pair each occurrence of the majority element with all other elements (non-majority), the majority element will still remain.


# Step-by-Step Explanation

1. Initialize a `count` variable to 0 and `candidate` variable to store the potential majority element.
2. Traverse the array:

   * If `count == 0`, set the current element as the candidate.
   * If the current element is equal to the candidate, increment `count`.
   * Else, decrement `count`.
3. After the traversal, `candidate` holds a potential majority element.
4. Verify the candidate by counting its actual occurrences.


# Code Snippet

```cpp
// Boyer-Moore Voting Algorithm
int majorityElement(vector<int>& nums) {
    int count = 0;
    int candidate = 0;

    // Phase 1: Find candidate
    for (int num : nums) {
        if (count == 0) {
            candidate = num;
        }
        count += (num == candidate) ? 1 : -1;
    }

    // Phase 2: Verify candidate
    count = 0;
    for (int num : nums) {
        if (num == candidate) count++;
    }

    if (count > nums.size() / 2) {
        return candidate;
    } else {
        return -1; // No majority element
    }
}
```


# Example Walkthrough

Array: `[2, 2, 1, 1, 1, 2, 2]`

* Candidate: 2 → count 1 → count 2 → candidate not match → count 1 → count 0
* Candidate: 1 → count 1 → count 2 → not match → count 1 → count 0
* Candidate: 2 → count 1 → count 2 → done.

Candidate = 2, check if count of 2 > 3 → Yes → return 2

# Advantages

* Time Complexity: **O(n)**
* Space Complexity: **O(1)**
* Very efficient for finding majority in one pass (plus a second pass to verify)

# Extended Concept: How Many Elements Can Appear More Than ⌊n/k⌋ Times?

## Rule of Thumb: 

** At most k - 1 elements can appear more than ⌊n / k⌋ times in an array of size `n`. **

## Examples: 

| Threshold       | Max elements possible |
| --------------- | --------------------- |
| More than ⌊n/2⌋ | **1## element         |
| More than ⌊n/3⌋ | **2## elements        |
| More than ⌊n/4⌋ | **3## elements        |
| More than ⌊n/k⌋ | **k - 1## elements    |

**Reason**: If `m` elements each appear more than ⌊n/k⌋ times, then:

```
m * (⌊n/k⌋ + 1) ≤ n ⇒ m ≤ k - 1
```

## Application 

This idea helps when you're trying to find elements appearing more than ⌊n/3⌋ times — in that case, you can use a **modified Boyer-Moore algorithm## that tracks two candidates instead of one.

