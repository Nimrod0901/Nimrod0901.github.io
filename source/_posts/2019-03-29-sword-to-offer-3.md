---
title: 剑指offer之从头到尾打印链表
date: 2019-03-29 19:47:46
categories: 技术向
tags:
	- 剑指offer
	- 算法
	- 链表
---

# 前言

最近一直在准备面试，也是在不停地刷算法题，所以开了一个新的系列，用于记录自己刷题之旅。

#  题目

输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。

# 思路

- 因为是逆序，输出顺序和访问顺序正好相反，所以构造一个栈，将结点依次入栈，然后弹到一个vector里面就是结果。
- 通过递归的方式，先运行下一个结点的函数，再将本结点的值`push_back`到`vector`里面去。

这两种思路都是**O(n)**的时间复杂度和**O(n)**的空间复杂度。不要在遍历的时候使用`vector::insert`因为它的时间复杂度是O(n)，最后时间复杂度会变成O(n^2)。

# 代码

## C++

### 思路一 栈

```c++
class Solution {
public:
    vector<int> printListFromTailToHead(ListNode* head) {
        stack<int> nodes;
        vector<int> res;
        ListNode* curr = head;
        while(curr) {
            nodes.push(curr->val);
            curr = curr->next;
        }
        while(!nodes.empty()) {
            res.push_back(nodes.top());
            nodes.pop();
        }
        return res;
    }
};
```

### 思路二 递归

```c++
class Solution {
public:
    vector<int> res;
    vector<int> printListFromTailToHead(ListNode* head) {
        ListNode* curr = head;
        if(curr) {
            if(curr->next) {
                printListFromTailToHead(curr->next);
            }
            res.push_back(curr->val);
        }
        return res;
    }
};
```
