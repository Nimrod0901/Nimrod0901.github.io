---
title: 剑指offer之树的子结构
date: 2019-03-30 20:48:26
categories: 技术向
tags:
	- 剑指offer
	- 算法
	- 树
---

# 题目

输入两颗二叉树A和B，判断B是不是A的子结构。我们约定空树不是任意一个树的子结构。

地址：[牛客网](<https://www.nowcoder.com/practice/6eA96c44c7004dA5bA6A0b9afca8bd88?tpId=A3&tqId=AAA70&tPage=A&rp=A&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking>)

# 思路

这个问题可以拆分成两个问题来想，首先找到A中与B的根节点相等的结点，然后再判断B是不是以这个结点为根的树的子树。如果不相等，则继续找到下一个与B根节点相等的结点，继续判断是否为子树，如若找到就返回真，否则一直寻找判断，直至找不到。

判断是否为子树的算法就先序遍历即可，如若父亲结点相等，则继续判断左儿子和右儿子是否对应相等。边界条件：遇到B的某个儿子是空的情况，则直接返回真，如果遇到A某个儿子是空，对应B结点不为空的时候返回假。

# 代码

## C++

```c++
class Solution {
public:
    bool HasSubtree(TreeNode* pRootA, TreeNode* pRootB){
        if(pRootB == nullptr || pRootB == nullptr) {
            return false; // 人为约定
        }
        
        return isSubtree(pRootA, pRootB) || HasSubtree(pRootA->left, pRootB) || HasSubtree(pRootA->right, pRootB); // 先判断是不是子树，不是就递归地从A左子树中找与B根结点相同的结点，再不是就递归地从A右子树中找与B根节点相同的结点。
    }
    
    bool isSubtree(TreeNode* pRootA, TreeNode* pRootB) {
        if(pRootB == nullptr) {
            return true; // 先判断此时B结点为不为空
        }
        
        if(pRootA == nullptr) {
            return false; // 再B结点不为空的前提下，判断A对应结点为不为空
        }
        
        if(pRootA->val == pRootB->val) {
            return isSubtree(pRootA->left, pRootB->left) &&  isSubtree(pRootA->right, pRootB->right);
        } else {
            return false;
        }
    }
}; 
```