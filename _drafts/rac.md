---
layout: post_page
title: RAC学习笔记
---

subscribeCompleted与subscribleNext区别
rac_sequence是什么作用
什么是 connection
什么时候subscription会disposed
side effect：可理解为注入操作

do开头的函数：为信号注入操作
doNext：在信号到达订阅者前执行block参数对应的操作
doError：在发生错误时执行block参数对应的操作
doCompleted：在信号主体完成时执行block参数对应的操作

flatten：可以把多个流的流合并为一个流(concat)，或者把多个信号合并(merge)

flattenMap：转换流中的每个元素为一个新的流，最后将所有流合并成一个流，等同于map+flatten

then：等待信号主体执行完成，再返回一个新的信号

merge：把多个信号合并成一个流

combineLatest:reduce：观察多个信号，当所有信号都有改变时，发出值

switchToLatest：应用于信号的信号，总是发送最后一个信号的值。
