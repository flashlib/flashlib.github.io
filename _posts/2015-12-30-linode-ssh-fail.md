---
layout: post_page
title: linode ssh无法连接的问题
---
##### 使用lish登陆ssh

* 进入Remote Access，在下面点击Launch Lish Ajax Console
* 输入 ```lish via ssh```
* 输入您的ssh帐号和ssh密码登录

##### 修改端口

```vi /etc/ssh/sshd_config``` 

*点击```i```即进入编辑状态，编辑完成后按```ESC```键退出编辑状态，退出编辑状态后输入```:wq```即可保存文档并退出vi编辑器*

##### 重启ssh服务
```/etc/init.d/sshd restart``` 
