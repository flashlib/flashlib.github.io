---
layout: post_page
title: Mac下python2.7和python3.3双版本环境安装lxml
---

由于在安装jekyll的时候，我把MacPorts删掉了，导致我运行[HoverCraft]时（一个利用[impress.js]将ReST文本转换为展示网页的工具，这个可以专门写一篇博客来介绍了，这里就不扩展了），找不到其依赖的libxml2版本。错误信息如下：

	> hovercraft codingDojo.rst codingDojo                        Traceback (most recent call last):
	  File "/Library/Frameworks/Python.framework/Versions/3.3/bin/hovercraft", line 9, in <module>
	    load_entry_point('hovercraft==1.2.dev0', 'console_scripts', 'hovercraft')()
	  File "/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/hovercraft-1.2.dev0-py3.3.egg/hovercraft/__init__.py", line 16, in main
	    from lxml import html
	  File "/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/html/__init__.py", line 42, in <module>
	    from lxml import etree
	ImportError: dlopen(/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so, 2): Library not loaded: /opt/local/lib/libxml2.2.dylib
	  Referenced from: /Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so
	  Reason: Incompatible library version: etree.so requires version 12.0.0 or later, but libxml2.2.dylib provides version 10.0.0
 
使用otool可以看到，其依赖于已经删除的MacPorts目录：

    > otool -L /Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so
    /Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so:
	    /opt/local/lib/libxslt.1.dylib (compatibility version 3.0.0, current version 3.28.0)
	    /opt/local/lib/libexslt.0.dylib (compatibility version 9.0.0, current version 9.17.0)
	    /opt/local/lib/libxml2.2.dylib (compatibility version 12.0.0, current version 12.1.0)
	    /opt/local/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.8)
	    /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 169.3.0)

我首先尝试使用easy_install安装:

	> wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | python3
*由于我的电脑上同时安装了python2.7和python3.3，且默认python版本是2.7，而HoverCraft需要python3.3以上，所以安装的时候需要使用python3进行安装。具体可以参考[easy_install官方主页][easy_install]。*

然后使用以下命令重新安装lxml（python需要安装lxml来获得此库）:

	> easy_install-3.3 lxml

完成后运行[HoverCraft]问题依旧，使用otool查看依赖关系仍然没变。怀疑easy_isntall未安装正确版本的依赖包，在下不才，不知道easy_install怎么指定正确版本的依赖包，只能下载lxml的安装包进行硬装了。在此[下载lxml][lxml_download]包，用如下命令将相关依赖包编译在一起：

    > python3 setup.py build --static-deps
    > sudo python3 setup.py install
具体命令参考[这里][lxml_install]。

再次运行[HoverCraft]正常，使用otool查看依赖关系变为如下：

    > otool -L /Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.2-py3.3-macosx-10.6-intel.egg/lxml/etree.so
    /Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.2-py3.3-macosx-10.6-intel.egg/lxml/etree.so:
	    /usr/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.5)
	    /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 169.3.0)
	    
[HoverCraft]: https://github.com/regebro/hovercraft/tree/1.0
[impress.js]: https://github.com/bartaz/impress.js
[lxml_download]: https://pypi.python.org/pypi/lxml/
[lxml_install]: http://lxml.de/build.html#building-lxml-on-macos-x
