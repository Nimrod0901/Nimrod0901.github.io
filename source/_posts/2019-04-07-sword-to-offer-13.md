---
title: 剑指offer之机器人的运动范围
date: 2019-04-07 23:11:30
categories: 技术向
tags:
    - 剑指offer
    - 算法
    - 回溯法
---

# 题目

地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

链接:[牛客网](https://www.nowcoder.com/practice/6e5207314b5241fb83f2329e89fdecc8?tpId=13&tqId=11219&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

# 思路

对于二维网格运动的题目，通常可以用回溯法解决。
开辟一个一维数组对应每一个方格，True为机器人可以，False为机器人不可以进入。如果机器人能进入一个点，我们再判断它能否进入上下左右的点。

# 代码
## C++
```c++
class Solution {
public:
  int movingCount(int threshold, int rows, int cols) {
    if (threshold <= 0 || rows <= 0 || cols <= 0) {
      return 0;
    }

    bool *visited = new bool[rows * cols];

    memset(visited, false, rows * cols);

    int count = helper(threshold, rows, cols, 0, 0, visited);
    delete[] visited;
    return count;
  }

  // 辅助函数
  int helper(int threshold, int rows, int cols, int row, int col,
             bool *visited) {
    if (visited[row * cols + col] == false &&
        getSum(row) + getSum(col) <= threshold && row <= rows &&
        col <= cols && col >= 0 && row >= 0) {
      visited[row * cols + col] = true;
      return 1 + helper(threshold, rows, cols, row + 1, col, visited) +
             helper(threshold, rows, cols, row, col + 1, visited) +
             helper(threshold, rows, cols, row - 1, col, visited) +
             helper(threshold, rows, cols, row, col - 1, visited);
    }
    return 0;
  }

  // 计算一个数的数位和
  int getSum(int number) {
    int sum = 0;
    while (number) {
      sum += number % 10;
      number /= 10;
    }
    return sum;
  }
};
```
