---
title: Leetcode-Convert to Base -2
date: 2019-04-04 22:28:31
categories: 技术向
tags:
	- Leetcode
	- 算法
	- 位运算
---

# 题目

Given a number `N`, return a string consisting of `"0"`s and `"1"`s that represents its value in base `**-2**` (negative two).

The returned string must have no leading zeroes, unless the string is `"0"`.

**Example 1:**

```
Input: 2
Output: "110"
Explantion: (-2) ^ 2 + (-2) ^ 1 = 2
```

**Example 2:**

```
Input: 3
Output: "111"
Explantion: (-2) ^ 2 + (-2) ^ 1 + (-2) ^ 0 = 3
```

**Example 3:**

```
Input: 4
Output: "100"
Explantion: (-2) ^ 2 = 4
```

地址：[Leetcode](<https://leetcode.com/contest/weekly-contest-130/problems/convert-to-base-2/>)

# 思路

这道题看上去比较特别，是负数进制，其实思路和任何进制的转换是一样的。唯一需要注意的地方是当一个数除以一个负数的时候，余数是非正数，而我们需要的是非负数。所以需要进行调整。

![]( http://latex.codecogs.com/gif.latex?d \equiv d - N\  (\textrm{mod}\ N)  N < 0, d < 0, d+N > 0)

 我们需要的余数是计算出的余数减上除数，让它成为正数，而商也要加1，因为我们相当于多除了一次。

# 代码

## Python

```python
class Solution:
    def baseNeg2(self, N: int) -> str:
        res = ""

        if N == 0:
            return "0"

        while(N):
            mod = N % (-2)
            if mod < 0:
                res += str(mod - (-2))
                N = N // (-2) + 1
            else:
                res += str(mod)
                N = N // (-2)
        return res[::-1]
```

