---
title: 你不爱VI，所以你不懂Vim
date: 2020-08-18 02:16:56
categories:
tags: 
	- Vim
---


> 译者按：这篇文章翻译自stackoverflow上“你在Vim上最高效的快捷键是什么？”的问题下的[高赞回答](https://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118)，作者是[Jim Dennis](https://stackoverflow.com/users/149076/jim-dennis)，我认为写的很棒，觉得有必要翻译出来。

你提到了用`yy`来复制，同时你又抱怨你几乎从来不会需要去复制整行，事实上程序员在写代码的时候经常对整行、多行和代码块操作。而`yy`也只是多种将文本复制进匿名的拷贝缓冲区（在**vi**中被称为寄存器register）方式中的一种。**vi**的禅意在于你像是在说一种语言。第一个`y`是一个动词，操作`yy`和`y_`是一样的，因为这个操作太常用了， 所以使用两个`y`更方便拼写。

`dd` `P`能达到同样的效果（删除本行，在需要的位置复制回来，作为副作用，它会在匿名寄存器中留下本行的副本）。这里两个**动作**`y`和`d`接受任何**移动**作为他们的主语。因此`yW`是从当前位置复制（yank）到下一个单词（word），`y'a`是从当前位置复制到标记a所在的那一行。

如果你仅仅理解基本的上下左右移动操作，那么**vi**对你而言，还不如一个记事本高效。（当然，你仍然可以使用语法高亮和拥有处理稍微大一点的文件的能力，但是对我而言这些是一样的。）

**vi**有26个标记和26个寄存器。使用`m`可以在任何位置设定一个标记。每一个标记都一个小写字母的名字。`ma`命令在当前位置设定a标记，`mz`会添加z标记。你可以使用`'`来跳转到有标记的那一行，`'a`会跳转到a标记所在行的行首。你可以使用<code>`</code>来跳转到任何标记的精确位置，所<code>&#96;z</code>可以跳转到标记z所在的位置。这些都是**移动**，所以他们可以作为其他的**动作**的主语。

所以，一个剪切一段任意选择的文本的方法是使用标记。（我通常使用a作为我的第一个标记，然后是z，然后是b，另外一个是e。我在使用**vi**的十五年时间中，不记得有哪次会用超过四个标记。每个人可以根据自己的习惯来制定如果使用标记和寄存器）。然后我们就可以移动到需要的文本的结尾，当然也可以从结尾开始，这无所谓。我们可以简单地使用<code>d&#96;a</code>来剪切，或者<code>y&#96;a</code>来复制，所以整个过程我们只需要五个键（如果我们刚开始在插入模式，需要再按下`Esc`切换模式）。如果我们想粘贴复制的内容，我们只需要一个键`p`。

我提到说这是剪切或者复制文件的一种方式，但这也只是很多种中的一种方式。我们经常需要在不移动光标也不设定标记的情况下更加简洁的描述文本的位置。比如我在一个段落中，我可以使用`{` 和`}`移动到段落的开始和结尾。所以，如果我想移动一个段落，我用`{` `d}`（只用三个键）。如果我恰好已经在段落的第一行或者最后一行，那么我可以使用`d}`或者`d{`。“段落”的概念默认是直观而合理的，它既适用于代码也适用于文章。

通常，我们知道某种模式（正则表达式）可以标记我们感兴趣的文本的一端或者另一端。向前或者向后搜索在**vi**中都是**移动**，所以他们也可以用作“主语”。我可以使用`d/foo`来从当前行剪切到下一个含有"foo"的行，`y?bar`来从当前行复制到之前最近含有"bar"的那一行。如果我不想要整行，我们可以使用前文讲到的`` ` ``标记。

在**vi**中除了“动词”和“主语”，同样还有“宾语”。到目前为止，我只讲到了匿名寄存器，我也可以通过前缀`"`使用任何26个有名字的寄存器作为宾语。如果我用`"add`，我会剪切当前行复制进入寄存器a，如果我用`"by/foo`，那么当前行到下一个含有"foo"的行会被复制进寄存器b。想要把寄存器中的内容粘贴出来，我用相同的前缀`"`就可以做到：`"ap`把寄存器a中的内容粘贴在光标后，`"bP`会把寄存器b中的内容粘贴在这行之前。

“前缀”的概念在我们的文本操作语言中也增加了语法上的“形容词”和“副词”的概念。大部分命令（动词）和移动（动词或宾语）可以有数字前缀。因此`3J`意味着合并下面的3行；`d5}`意味着从当前行删除到从这数下面的第5段的结尾。

这些都是**vi**的中级内容，没有一个是**Vim**特有的，并且如果你愿意去学的话，**vi**中还有更加高级的技巧。如果你仅仅想要掌握这些中级技巧，那么你会发现你很少需要去编写宏，因为文本操作语言已经足够简洁明了，可以使用编辑器“原生”语言来起送完成大多数的事情。

### 高级技巧的例子

有很多`:`命令，其中最有名就是`:% s/foo/bar/g`全文替换（这并不高级，但是其他`:`命令可以很高级）。所有`:`系列命令都是过去从一个**vi**的变体**ed**(line editor)和之后出现的**ex**(extended line editor)中继承而来的。事实上**vi**得名于**ex**的可视化界面（**v**isual **i**nterface）。`:`命令通常对于多行进行操作。**ed**和**ex**程序诞生在一个终端屏幕并不常见的年代，许多终端都是TTY设备，所以通常是通过极其简洁的界面来处理文本的印刷副本（常见的连接速度为110波特，或者在每秒11个字符——这比一些熟练的打字员要慢；在多用户交互的场景下，卡顿非常普遍；此外他们的诞生也有节约纸张成本的因素）。大多数`:`命令的语法包括一个地址或者地址范围（行号），后跟一个命令。使用纯数字代表行号，`:127,215 s/foo/bar`可以把127到215行中的每一行内第一次出现的"foo"替换成"bar"，同样也可以使用一些缩写，比如`.`或者`$`分别对应第一行和最后一行，同样也可以使用`+`和`-`来分别指代相对于本行上和下的偏移。所以`:.,$j`意思是“把当前行到最后一行合并成一行”。`:%`是`:1,$`全部行的另一种表示方法。

`:...g`和`:...v`值得做一些解释，因为他们超级强大。`:...g`是在全文中对能够匹配上某种模式（正则表达式）的行执行一个操作的前缀，而`:...v`是对所有不能匹配上模式的行执行一个操作（"v"意思是相反con**V**erse）。和其他**ex**命令一样，这些命令可以将地址/范围作为前缀。所以`:.,+21g/foo/d`意思是从当前行到向下21行，删除任何包含"foo"的行，而`:.,$v/bar/d`意思是从当前行到最后一行，删除所有不包含"bar"的行。一件非常有有趣的事情是Unix下的通用命令**grep**实际上是受此条**ex**命令启发的（并且以它记录的方式命名）。**ex**命令`:g/re/p`(grep)是他们记录如何“全文g”“打印p”包含“正则表达式re”的行的方式。`:p`是任何人学到的第一条命令，也通常是编辑任何文件使用的第一条命令。这就是你如果打印当前内容的方式（通常使用`:.,+25p`或者类似方法一次仅打印一页）。

请注意`:% g/.../d`或者它的反操作`:% v/.../d`是最为常用的命令了。然而也有很多其它也值得你一记的**ex**命令。我们可以用`m`来移动行，`j`来合并行。比如你有一个列表，你想要分开所有符合某种模式的元素（或者不符合），但你不想删除其他。那么你可以使用`% g/foo/m$`之类的命令，那么所有含有foo的行都移动到了文本的最后。这能够保留所有含有提取出来的行的相对顺序，这和`1G!GGmap!Ggrepfoo<ENTER>1G:1,'a g/foo'/d`达到的效果是一样的（复制文件内容到文末，使用`grep`来过滤文末，然后从头删除所有的内容）。

几乎不需要提的是你可以使用我们的老盆友`s`（替换substitute）配合上`g`和`v`一起操作。通常你并不需要使用到它。但是考虑到某些情况下，你想要仅仅对符合某种的模式的行进行替换操作，一般你可以用非常复杂的模式来匹配并且配合捕获和回溯引用（back reference）来保留你不想被替换掉的部分，然而如果分开替换中的匹配部分，事情通常会更简单：`:% g/foo/s/bar/zzz/g`对于含有foo的每一行把bar替换成zzz。类似于`:% s/\(.*foo.*\)bar\(.*\)/\1zzz\2/g`的操作仅仅适用于那些foo在bar之前的行，它已经足够笨拙了，还得进一步处理bar在foo之前的行。

关键是**ex**命令集中不止有`p`,`s`和`d`。`:`也可以用来指代标记。因此你可以使用`:'a,'b/foo/j`来将所有在标记a和标记b之间包含foo的行和它的下一行合并。（没错，所有前文讲过的**ex**命令的例子都可以通过添加这些寻址表达式来应用于文件的行。这非常的晦涩（在过去的15年中，我仅仅使用过几次类似的操作）。但是我承认我会经常迭代的进行交互操作，如果我花些时间考虑正确的做法，那么可能会更加有效率。

另外一个**vi**和**ex**的非常有用的命令是使用`:r`来读取别的文件的内容。`:r foo`把文件名为foo的内容插入在本行。`:r!`更强大，它可以读取命令的结果。它等效于先暂停当前**vi**，运行一条命令，把结果重定向到一个临时文件，继续**vi**，从临时文件中读取内容。更加强大的是`!`（bang）和`:... !`（**ex** bang）。它们同样也能执行外部命令然后读取结果到当前的文本中，此外他们能够通过命令来选择文本。我们可以通过`1G!Gsort`（G在**vi**中的意思是去（goto），它默认会移动到文本的最后一行，但是也可以加上行号前缀，比如1，移动到第一行），这跟`:1,$!sort`是一样的。作家经常使用`!`配合Unix的**fmt**或者**fold**工具来格式化或者“包裹”选中的文字。`{!}fmt`是一个常用的宏，用来重新格式化当前段落。程序员有时会通过**indent**或者其它的代码格式化工具来格式部分或者全部的代码。使用`:r!`和`:!`意味着外部工具会被当作编辑器的拓展。我曾经偶尔在用脚本从数据库拉数据的时候，或者用**wget**或者**lynx**从网站上下载数据的时候，或者通过**ssh**来从服务器上下载数据的时候用过这个命令。

另外一个非常有用的**ex**命令是`:so`（`:short`的简写），它会读取一个文件的内容作为一系列的命令去执行。当你正常打开**vi**的时候，它会隐式的执行`:source ~/.exinitrc`，（**Vim**通常会用`~/.Vimrc`）。配合这个命令，你可以通过简单地执行几条新的命令就能够即时改变编辑器的配置。如果你很机智，你甚至可以用这个技巧来存储执行在文件上的**ex**命令。比如，我有一个7行（36个字符）的文件，需要先**wc**，然后在第一行插入一个包含字符个数的C语言风格的注释。那么我就用命令`:Vim +'so mymacro.ex' ./mytarget`可以把这个“宏”执行在我的文件上。（**vi**或者**Vim**的`+`选项通常用来在文件的指定行打开这个文件，但很多人不知道的是，任何有效的**ex**命令或者表达式都可以跟在`+`后面，就比如我讲的这个`source`例子。再比如一个简单的例子，如果我想要重新给一些服务器安装镜像，我有一个脚本会调用`vi +'/foo/d|wq!' ~/.ssh/known_hosts`来直接从服务器上的*ssh known hosts*中删除某条host。）

`@`可能是最难懂的**vi**命令了。在快十年的教授高级系统管理的课程时间中，我偶尔遇到有人用过这个命令。`@`会执行寄存器中的内容，如果这个号内容是**vi**或者**ex**命令。比如我经常使用`:r!locate ...`来找到系统中的某个文件并把它的目录读入文本。不需要再敲别的键，我需要的文件的完整路径就会被写进来。相比于费力的不断`Tab`来补全路径中的每个部分（或者在不支持Tab补全的**vi**机器上会更糟），我会这么写：

1. `0i:r` 把当前行作为一个有效的`:r`命令
2. `"cdd` 把当前行删掉保存到寄存器c中
3. `@c` 执行命令

这仅仅只需要敲10个键。（`"cdd`和`@c`对我而言是非常高效的宏命令，所以我能非常快的敲这个6个键）

### 感慨

我也是仅仅接触了**vi**的强大威力的皮毛，并且我所讲的没有一点是**Vim**命名中的提升。我所讲述的在20或者30年前的**vi**上也应该奏效。有很多人能在**vi**上比我发挥更巨大的威力。