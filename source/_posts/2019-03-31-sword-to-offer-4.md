---
title: 剑指offer之二维数组中的查找
date: 2019-03-31 15:07:20
categories: 技术向
tags:
	- 剑指offer
	- 算法
	- 数组
---

# 题目

在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

地址：[牛客网](https://www.nowcoder.com/practice/abc3fe2ce8e146608e868a70efebf62e?tpId=13&tqId=11154&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

# 思路

这个二维数组有个特征：自左上向右下递增，所以这个二维数组的右上角元素和左下角元素在查找元素的时候有着巨大的作用，选取其中任一即可。拿右上角举例，如果目标元素和右上角元素相等，那我们就找到了这个元素；如果右上角元素大于目标元素，因为右上角元素是最右一列最小的，那么目标元素一定不在最右一列，可以把最右一列删去；如果右上角元素小于目标元素，因为右上角元素是最上行最大的，那么目标元素一定不在最上一行，可以把最上一行删去。这样一步步减小范围，当所有行列都被删去还没有找到目标元素，那么数组中就找不到这个目标。

之所以不用左上角或者右下角，是因为不能找到分别大于小于目标元素的两种情况，左上角和右下角分别对应数组的最小值和最大值，只能判断目标元素有没有可能在数组中，不能进一步缩小范围。

这种算法的最坏情况便是从右上角一路删减，直至删减到左下角（或者相反），假设矩阵规模为M*N，那么最坏情况时间复杂度是O(M+N).

# 代码

## C++

```c++
class Solution {
public:
    bool Find(int target, vector<vector<int> > array) {
        int rows = array.size(), cols = array[0].size();
        int row = 0, col = cols-1;
        while(row < rows && col >= 0) {
            if(array[row][col] == target) {
            	return true;
            } else if (array[row][col] > target) {
            	col--;
            } else if (array[row][col] < target) {
            	row++;
            }
        }
        return false;
    }
};
```

**不要用`size_t`代替`int`，否则编译不通过**