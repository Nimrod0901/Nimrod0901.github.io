---
title: 剑指offer之二进制1的个数
date: 2019-04-03 00:13:57
categories: 技术向
tags:
	- 剑指offer
	- 算法
	- 位运算
---

# 题目

输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

地址：[牛客网](<https://www.nowcoder.com/practice/8ee967e43c2c4ec193b040ea7fbb10b8?tpId=13&tqId=11164&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking>)

# 思路

常规右移的做法大家都会，但是要注意特殊样例的问题。

原书中的例子，0x80000000，在右移的时候会变成0xC0000000。这是因为移位会保证数字符号不变。如果一直右移，这个数字会变成0xFFFFFFFF，从而陷入死循环。

一个巧妙的做法：

一个数的二进制减一相当于将最右边的1变为0，这个1右边的0变成1，利用这一特性，将一个数减一与这个数相与，相当于把最右边的1变成0。这样有多少个1，做多少次这样的操作，最后这个数为0就跳出循环。一共只做这个数字中1个数的循环。

# 代码

```c++
class Solution {
public:
     int  NumberOf1(int n) {
         int count = 0;
         while(n) {
             count++;
             n = (n - 1) & n;
         }
         return count;
     }
};
```

