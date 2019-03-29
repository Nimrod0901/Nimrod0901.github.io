---
title: 编辑距离(Edit Distance)问题
date: 2018-11-28 09:48:36
categories: 技术向
tags: 
    - 算法
    - DP
    - 字符串
    - Python
---

# 背景介绍

**编辑距离**是针对两个字符串的差异程度的量化量测，量测方式是看至少需要多少次的处理才能将一个字符串变成另一个字符串。  
而编辑距离也有不同的定义，这里讲的是最为常用的[莱文斯坦距离](https://en.wikipedia.org/wiki/Levenshtein_distance)，而常常提到编辑距离时候也指的就是莱文斯坦距离，为表述方便，下文‘编辑距离’都特指‘莱文斯坦距离’。  
编辑距离常常被应用于拼写纠错，DNA分析，机器翻译，信息提取，语音识别等领域。

![图片来自于MIT CS124公开课课件](https://s1.ax1x.com/2018/12/01/FnJgVH.jpg)

# 问题描述

给定两个字符串A, B，只允许以下三中操作：
-   删除(Delete)一个字符
-   插入(Insert)一个字符
-   替换(Subtitute)一个字符

计算将A转换成B的最少操作次数，也就是所谓的编辑距离。

# 举例

A串abbcc，B串abcde，将abbcc变为abcde的最小处理方式如下：
-   a**b**bcc → abcc（删除b）
-   abc**c** → abc**d**（将c改为d）
-   abcd → abcd**e**（最后加入g）
所以abbcc=>abcde的编辑距离为3

# 思路

把这个问题用动态规划的方法分解成相似的子问题。  
设A串的长度为m，`a[1..m]`，B串的长度为n,`b[1..n]`，设`edit[i][j]`为从长度为i的A的前缀到长度为j的B的前缀的编辑距离(`a[1..i]`=>`b[1..j]`)，于是问题就被转换为计算`edit[m][n]`。

考虑以下情况：
-   `a[i] == b[j]`  
    `edit[i][j] = edit[i-1][j-1]`，比如abc=>edc的编辑距离就等于ab=>ed的编辑距离
-   `a[i] != b[j]`,取下面三种情况中的最小值：
    -   考虑删除`a[i]`  
    比如abc=>cde，删除c，转换为ab=>cde的编辑距离+1，`edit[i][j] = edit[i-1][j] + 1`
    -   考虑在`a[i]`后插入`b[j]`
    比如abc=>cde，在c后面插入e，转换为abce=>cde的编辑距离+1， 根据`a[i] == b[j]`的情况， 又等于abc=>cd的编辑距离+1`edit[i][j] = edit[i][j-1] + 1`
    -   考虑将`a[i]`替换成`b[j]`
    比如abc=>cde，将c替换成e，转换成abe=>cde的编辑距离+1，又等于ab=>cd的编辑距离+1，`edit[i][j] = edit[i-1][j-1] + 1`
    
边界情况：
-   `edit[0][j] = j`，A串为空，插入`b[1..j]`，插入j次
-   `edit[i][0] = i`，B串为空，删除`a[1..i]`，删除i次

递推式：

![Fn699U.gif](https://s1.ax1x.com/2018/12/01/Fn699U.gif)

# 代码

有了递推式，我们就可以愉快的dp啦，下面是Python代码

``` Python
import numpy as np
def edit_distance(a, b):
    m, n = len(a), len(b)
    edit = np.zeros((m+1, n+1), dtype=np.int)
    
    edit[0] = [j for j in range(n + 1)] # 边界edit[0][j] = j
    edit[:, 0] = [i for i in range(m + 1)] # 边界edit[i][0] = i
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                edit[i][j] = edit[i - 1][j - 1]
            else:
                edit[i][j] = min(edit[i - 1][j] + 1, # 删除
                                edit[i][j - 1] + 1, # 插入
                                edit[i - 1][j - 1] + 1) # 替换
    return edit[m][n]
```

很容易看出来时间复杂度是`O(mn)`，空间复杂度也是`O(mn)`

# 优化

在计算动态规划矩阵的过程中，每一个元素的值只与它左、上和左上角的元素有关，每一行的计算只依赖上一行的值，所以我们可以改用一个长度为n的一维数组。

在根据边界情况`edit[0][j] = j`初始化一维数组之后，在每次从`edit[0]`计算开始，我们应该先存储`edit[0]`，因为它是`edit[1]`的左上角，同时根边界情况`edit[i][0] = i`将`edit[0]`改成行号的值，然后从`edit[1]`算起，每次计算之前都需要将`edit[j]`存起来因为它是`edit[j+1]`的左上角

## 代码
``` Python
import numpy as np
def edit_distance(a, b):
    m, n = len(a), len(b)
    edit = np.zeros(n+1 , dtype=np.int)
    edit = [j for j in range(n + 1)]
    
    for i in range(1, m + 1):
        old = edit[0]
        edit[0] = i
        for j in range(1, n + 1):
            temp = edit[j]
            if a[i - 1] == b[j - 1]:
                edit[j] = old
            else:
                edit[j] = min(edit[j-1] + 1, # 删除
                                edit[j] + 1, # 插入
                                old + 1) # 替换
            old = temp
    return edit[n]
```
优化后的空间复杂度就变成了`O(n)`

# 参考资料
-   [MIT CS124课件](https://web.stanford.edu/class/cs124/lec/med.pdf)
-   [编辑距离](https://www.dreamxu.com/books/dsa/dp/edit-distance.html)
-   [Edit distance - Wikipedia](https://en.wikipedia.org/wiki/Edit_distance)
