---
title: 手写KNN
tags:
  - K邻近算法
categories: 技术向
date: 2019-03-21 16:37:29
---


# KNN原理
KNN又称K邻近，是一种基本分类与回归方法，通过找到与待测样本距离最近的K个样本，然后把这K个样本中标签出现次数最多的标签作为预测值。

# 数据集
Mnist数据集，通过Tenserflow导入，样本规模是 28 \* 28的矩阵，训练集大小是60000， 测试集的大小是10000

# 实现
## 导入数据
因为数据量比较大，二值化方便计算，并且将二维的矩阵扁平化，使得训练样本变为784维的矩阵。

```Python
def loadData():
    import tensorflow as tf
    mnist = tf.keras.datasets.mnist
    (X_train, y_train),(X_test, y_test) = mnist.load_data()
    X_train[X_train >= 127] = 1
    X_train[X_train < 127] = 0
    X_test[X_test >= 127] = 1
    X_test[X_test < 127] = 0
    # X_train, X_test = X_train / 255.0, X_test / 255.0 # 标准化
    X_train = X_train.reshape(X_train.shape[0], X_train.size // X_train.shape[0])
    X_test = X_test.reshape(X_test.shape[0], X_test.size // X_test.shape[0])
    return X_train, X_test, y_train, y_test
```

## KNN算法
```Python
# 欧几里得距离
def euclideanDistance(x1, x2):
    return np.sqrt(np.sum(np.square(x1-x2)))


def kNearestNeighbor(X_train, y_train, vec, k=1, kind='eu'):
    """
    Parameters:
        X_train: 训练数据集
        y_train: 训练标签集
        vec: 用于预测的数据
        k: K值
    Returns:
        预测标签
    """
    trainSize = X_train.shape[0]
    cls_cnt = {}  # 用来判断测试数据属于哪个分类
    if kind == 'eu':
        # 欧式距离
        dist = np.apply_along_axis(euclideanDistance, 1, X_train, vec)  # 这个函数帮助我们再每行应用计算距离 
    if kind == 'ma':
        # 曼哈顿距离
        dist = np.apply_along_axis(manhattanDistance, 1, X_train, vec)  # 这个函数帮助我们再每行应用计算距离
        
    for el in dist.argsort()[:k]:
        cls_cnt[y_train[el]] = cls_cnt[y_train[el]] + 1 if y_train[el] in cls_cnt else 1
    return max(cls_cnt)
```

## 测试样本

```Python
if __name__ == '__main__':
    err = 0
    testSize = X_test.shape[0]
    for i in range(testSize):
        print('Testing the {} data'.format(i))
    test_vec = X_test[i]
    pred = kNearestNeighbor(X_train, y_train, test_vec, 3, kind='eu')
    if pred != y_test[i]:
        err += 1
    acc = 1 - err / testSize
    print(acc)
```

# 结果

![](/img/KNNres.jpg)
准确率为94.98%,效果还是可以的。
