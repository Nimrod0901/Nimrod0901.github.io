---
title: Haskell中的Type Classes
date: 2019-06-20 11:04:12
tags:
	- Haskell
---

#  从Type说起

在Haskell中，所有表达式都有type, 每一个表达式的type都在编译期被确定，所以在运行之前编译器就能够及时发现错误。作为一个强静态类型语言，Haskell有类型推导的能力，这意味着你不用明确表达式的类型，编译器也能够推导出来。

Haskell有个非常重要的特性就是多态(Polymorphism)，而多态又通常分为两种：Parametric polymorphism和Ad-hoc polymorphism。

##Parametric polymorphism 

Parametric polymorphism针对一切type，它对type没有任何限制。不同type的输入，达到的效果应该是一样的。比如以下这个例子：

```shell
λ> :t head
head :: [a] -> a
```

head函数作用是获取列表的第一个元素，无论我们传入一个`[Int]`还是`[Char]`，head函数作用的结果都是获取第一个元素，和传入的type并无关系。

## Ad-hoc polymorphism

Ad-hoc polymorphism，也就是所谓的overloading(重载)，同样的函数针对不同的type产生不同的作用。一个最典型的例子就是`+`（这个例子仅仅为了说明Ad-hoc polymorphism，并不满足Haskell），我们根据输入的类型来确定产生如何的作用——

- 1 + 2 = 3
- "aaa" + "bbb" = "aaabbb"
- [1, 2] + [3]

在Haskell中，Type Class的存在就是为了支持Ad-hoc polymorphism，`+`的type既不是某一种特定的类型`Int -> Int -> Bool`，也不是宽泛的任何类型`a -> a -> Bool`，我们希望的是所有应该支持`+`的类型。

# 什么是Type Class

**Type class**可以理解为定义满足某种行为的集合，如果某一个type是一个type class的实例，那么这个type一定支持这个type class所定义的行为。

比如`Eq`

```Haskell
class Eq a where
	(==) :: a -> a -> Bool
```

`Eq`的存在让我们能够为满足特定行为的class写重载函数，这里这种特定行为就是`==`在这些class中被定义。

当我们需要某一个类能够支持某种type class的时候，我们使用`instance`

```haskell
data Myclass = Err String | Val Int

instance Eq Myclass where
  (Err x) == (Err y) = x == y
  (Val x) == (Val y) = x == y
  _       == _       = False
```

注意到我们使用到了`String`和`Int`的`Eq`，因为他们已经是`Eq`的实例了。

当我们在为某种type class编写函数的时候，我们需要用(=>)来指定这种类型，它需要被置于类型声明之前。

```haskell
myFun :: Eq a => a -> b -> a
```

## 自定义Type class

我们当然也可以自己定义自己的Type class，就像`Eq`一样，根据我们具体需要哪些特定行为规定需要定义哪些函数才能成为这个Type calss的实例。比如我们设计一种可数的Type class，我们希望任何满足这种行为的type都可以转换为`Int`

```haskell
class Countable a where
	count :: a -> Int
```

 比如我们希望`String`可数，它的数量就是它的长度。

```haskell
instance Countable String where
	count [] = 0
	count (x:xs) = 1 + count xs
```

这样就完成了`String`对我们自定义的`Countable`类的实例化。

## 其他

在Haskell中，除了`Eq`之外还有许多其他内置Type class，比如`Show`，`Num`等等，这里就不一一赘述。

# 总结

这里简单的解释了Haskell中的Type class，如果想更深入的了解，个人推荐[Types and Typeclasses - Learn You a Haskell for Great Good!](http://learnyouahaskell.com/types-and-typeclasses)这篇文章和其他相关文章，讲的非常清晰易懂。

# Reference

1. [Polymorphism - HaskellWiki - Haskell.org](https://wiki.haskell.org/Polymorphism)
2. [Type Classes - Haskell.org](https://www.haskell.org/tutorial/classes.html)
3. [Types and Typeclasses - Learn You a Haskell for Great Good!](http://learnyouahaskell.com/types-and-typeclasses)