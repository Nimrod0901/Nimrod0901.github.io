---
title: Conda"EnvironmentLocationNotFound"错误解决方案
layout: post
date: 2018-05-11
categories: 技术向
tags:
  - Python
  - Anaconda
---

今天用Conda的时候弹出来个错误

``
EnvironmentLocationNotFound: Not a conda environment..
``

# **解决方案:**

*   进入出现问题的目录
*   进入``..\Anaconda3\pkgs\nb_conda-2.2.0-py36_0\Lib\site-packages\nb_conda``(具体目录也许不同)
*   打开``envmanager.py``文件
*   替换``for env in info['envs']]``为``for env in info['envs'] if env != info['root_prefix']]``

# 错误原因：
之前版本conda是``envs=[]``,而4.4版本之后``envs=[root_env_dir]``，然而这个目录通常并不是空的，官方可能在后续的更新中解决这个问题。

# 参考链接：
<https://github.com/Anaconda-Platform/nb_conda/issues/66>
