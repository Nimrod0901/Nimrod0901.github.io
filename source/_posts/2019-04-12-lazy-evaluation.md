---
title: Python中的惰性求值
date: 2019-04-12 11:32:40
categories: 技术向
tags: 
    - 惰性求值
---

# 什么是惰性求值？
[**惰性求值(Lazy Evaluation)**](https://en.wikipedia.org/wiki/Lazy_evaluation)，简言之就是直到需要的时候再求值，表达式不再被绑定到变量的时候立即计算出来，而是在当值被取用的时候才计算。与之相反的是[**及早求值(Early Evaluation)**](https://en.wikipedia.org/wiki/Eager_evaluation)，也就是一旦出现一个数或者表达式，就去计算它。及早求值是绝大多数传统编程语言中的求值策略。

# 惰性求值的优点

惰性求值的最大优点就是**减少内存开销**，不用保存所有数据，只有当需要用到某个数据的时候，再计算它即可。

另外一个优点就是可以通过惰性求值制造出一个**无限大**的数据类型。


# Python中的惰性求值生成器(generator)
Python中的[**生成器**](https://wiki.python.org/moin/Generators)就是一个典型的惰性求值的例子。

当我们需要计算一个非常大的序列的时候，甚至无限的时候，我们就可以使用生成器。

看一个例子

```Python
def fib():
  a, b = 0, 1
  while True:
    yield a
    a, b = b, a + b
```
我们通过`yield`关键词将一个函数fib变成一个生成器函数，与普通函数不同，生成器函数只能用于迭代操作，它的一个特征是只会回应再在迭代中用到的next操作。

```shell    
>>> f = fib()  # f是一个生成器
>>> f
<generator object fib at 0x7fe5b0259bf8>
>>> next(f)
0
>>> next(f)
1
>>> next(f)
1
# 如果没有终止条件，可以无限下去
```

但是生成器不可以生成之前已经生成的元素，如果想要生成那些数，只能重新创建一个生成器对象，或者将需要的数存储起来。

``` shell
>>> r = range(100)
>>> import sys
>>> sys.getsizeof(r)
48
>>> list(range(100))
>>> sys.getsizeof(l)
1008
```
这里就体现出生成器节省内存的地方了。

# 自定义延迟属性

如果我们想自定义一个类似的惰性计算的数据类型，可以使用一个描述器类。具体可以看[这里](https://python3-cookbook.readthedocs.io/zh_CN/latest/c08/p10_using_lazily_computed_properties.html?highlight=lazy)。

# 总结

Python中的惰性求值主要是通过生成器，当然还有别的一些方法，例如`zip()`。惰性求值可以节省内存， 可以创造出无限的数据类型，前提是牺牲了存储前值的代价。
