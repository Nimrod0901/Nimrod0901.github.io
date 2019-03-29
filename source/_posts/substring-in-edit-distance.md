---
title: 编辑距离解决字符串模糊匹配问题(Approximate string matching)
date: 2018-12-01 15:34:34
categories: 技术向
tags: 
    - 算法
    - DP
    - 字符串
    - Python
---
这是由[上一篇文章](http://nimrod.life/2018/11/28/edit-distance)衍生出来的一个问题，有兴趣的同学可以阅读一下

# 问题描述

给定两个字符串A, B，只允许以下三中操作:

-   删除(Delete)一个字符
-   插入(Insert)一个字符
-   替换(Subtitute)一个字符

计算将A转换成B的**子串**最少操作次数，这个问题被称作是字符串模糊匹配

# 思路

跟编辑距离不一样，需要计算的是A=>B所有子串编辑距离中最少的

## 最初思路

因为在用动态规划计算编辑距离的时候，如果是用二维数组存的，那么最后一行`edit[m][j]`代表把A串转换成长度为j的b的前缀的编辑距离(如果用的是一维数组，那么就是计算完成的数组)。我们能够求出`a[1..m]`=>`b[1..j]`的编辑距离的最小值，只要重复n次，分别求出`a[1..m]`=>`b[1..j]`， `a[1..m]`=>`b[2..j]`..`a[1..m]`=>`b[1..j]`各自的最小值，再求出最小值中最小的，即是我们需要的了。

这样的时间复杂度因为计算了n次编辑距离的动态规划矩阵，所以是`O(mn^2)`

## 优化思路

上面的想法问题是被限制在了子串这个问题上，默认计算子串就应该比要原来编辑距离的问题要复杂，其实用动态规划的思想，同样的时间复杂度一样能解决

在编辑距离的问题中，我们设`edit[i][j]`为`a[1..i]`到`b[1..j]`的编辑距离，这里为了能够顾及到子串，设`edit[i][j]`为`a[1..i]`到以`b[j]`结尾的所有子串的编辑距离中的**最小值**(这里你可能困惑，说改就改吗?不要着急，下面会解释)

对于非边界情况，递推关系还是一样：

![Fny5AP.gif](https://s1.ax1x.com/2018/12/01/Fny5AP.gif)

唯一不同的是边界条件：
-   `edit[i][0] = i`，B串是空，删除`a[1..i]`，删除i次(这个也一样)
-   `edit[0][j] = 0`，A串是空，A串已经是B串的子串，不用任何操作

所有有着这样的递推关系：

![Fn6ShT.gif](https://s1.ax1x.com/2018/12/01/Fn6ShT.gif)

# 代码

``` Python
import numpy as np
def edit_distance(a, b):
    m, n = len(a), len(b)
    edit = np.zeros((m+1, n+1), dtype=np.int)
    
    edit[0] = 0 # 边界edit[0][j] = 0
    edit[:, 0] = [i for i in range(m + 1)] # 边界edit[i][0] = i
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                edit[i][j] = edit[i - 1][j - 1]
            else:
                edit[i][j] = min(edit[i - 1][j], edit[i]
                                 [j - 1], edit[i - 1][j - 1]) + 1
    return min(edit[m]) # 因为我们要求的是所有子串中的最小值
```

# 理解


<div align="center">![FncNZR.gif](https://s1.ax1x.com/2018/12/01/FncNZR.gif)</div>

图来自于[
Fuzzy substring matching with Levenshtein distance in Python](<http://ginstrom.com/scribbles/2007/12/01/fuzzy-substring-matching-with-levenshtein-distance-in-python/>)， 我们可以看到aba=>cabbacc子串模糊匹配为1

关于为什么能够直接这么修改递推关系，因为动态规划的每一子问题的解都是基于上一个子问题的解，所以只要求出边界条件，就可以往下求解。

# 参考资料

-   [Fuzzy substring matching with Levenshtein distance in Python](<http://ginstrom.com/scribbles/2007/12/01/fuzzy-substring-matching-with-levenshtein-distance-in-python/>)
