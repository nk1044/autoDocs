# Sieve of Eratosthenes

The **Sieve of Eratosthenes** is an efficient algorithm for finding **all prime numbers** up to a given integer `n`.


# Overview

* Time Complexity: **O(n*log(log n))**
* Space Complexity: **O(n)**
* Ideal for: Generating all primes up to `n` (typically ≤ 10⁷)
* Not suitable for individual primality testing of large numbers (use Miller-Rabin for that)


## Intuition

* Start with all numbers from `2` to `n` as potential primes.
* Iteratively **mark all multiples** of each prime (starting from 2) as **composite (not prime)**.
* The remaining unmarked numbers are primes.


# Sieve Algorithm Steps

1. Create a boolean array `isPrime` of size `n + 1`, initialized to `true`.
2. Mark `isPrime[0]` and `isPrime[1]` as `false` (since 0 and 1 are not prime).
3. For every number `p` from `2` to `√n`:

   * If `isPrime[p]` is `true`, mark all multiples of `p` as `false`.
4. After completion, all `i` such that `isPrime[i] == true` are prime numbers.


# C++ Code: Basic Sieve

```cpp
#include <iostream>
#include <vector>
using namespace std;

void sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int p = 2; p * p <= n; ++p) {
        if (isPrime[p]) {
            for (int multiple = p * p; multiple <= n; multiple += p) {
                isPrime[multiple] = false;
            }
        }
    }

    // Output primes
    for (int i = 2; i <= n; ++i) {
        if (isPrime[i]) cout << i << " ";
    }
    cout << endl;
}

int main() {
    int n = 50;
    sieve(n);
    return 0;
}
```


## Optimization Note

* The inner loop starts from `p * p`, not `2 * p`, because all smaller multiples would have already been marked by smaller primes.
* We only need to iterate `p` up to `√n` since larger factors will be caught by smaller ones.


# Generate Prime Count or Prime Vector

Want to return the list of primes?

```cpp
vector<int> generatePrimes(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int p = 2; p * p <= n; ++p) {
        if (isPrime[p]) {
            for (int i = p * p; i <= n; i += p) {
                isPrime[i] = false;
            }
        }
    }

    vector<int> primes;
    for (int i = 2; i <= n; ++i) {
        if (isPrime[i]) primes.push_back(i);
    }
    return primes;
}
```


# Sieve with Smallest Prime Factor (SPF)

Useful for fast prime factorization.

```cpp
vector<int> smallestPrimeFactor(int n) {
    vector<int> spf(n + 1);
    for (int i = 0; i <= n; ++i) spf[i] = i;

    for (int i = 2; i * i <= n; ++i) {
        if (spf[i] == i) {  // i is prime
            for (int j = i * i; j <= n; j += i) {
                if (spf[j] == j)
                    spf[j] = i;
            }
        }
    }
    return spf;
}
```


# Applications of Sieve

* **Generate all primes ≤ n**
* **Count number of primes ≤ n**
* **Fast prime factorization** (using SPF)
* **Euler’s Totient Function**
* **Precomputing Möbius function**
* **Solving number theory problems efficiently**


## Example Output

For `n = 20`, the sieve gives:

```
2 3 5 7 11 13 17 19
```


# Final Notes

* **Sieve is optimal up to `1e7`** or so; for larger limits, use a **segmented sieve**.
* For one-shot primality checks of large numbers (like 64-bit values), use **Miller-Rabin**.
* You can tweak sieve for specific ranges `[L, R]` using **Segmented Sieve**.

