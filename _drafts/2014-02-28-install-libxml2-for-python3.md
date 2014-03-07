---
---

###删除MacPorts后libxml2版本错误问题的解决

由于在安装jekyll的时候，我把MacPorts删掉了，导致我运行[HoverCraft]时（一个利用[impress.js]将ReST文本转换为展示网页的工具，这个可以专门写一篇博客来介绍了，这里就不扩展了），找不到其依赖的libxml2版本。错误信息如下：

	hovercraft codingDojo.rst codingDojo                        Traceback (most recent call last):
	  File "/Library/Frameworks/Python.framework/Versions/3.3/bin/hovercraft", line 9, in <module>
	    load_entry_point('hovercraft==1.2.dev0', 'console_scripts', 'hovercraft')()
	  File "/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/hovercraft-1.2.dev0-py3.3.egg/hovercraft/__init__.py", line 16, in main
	    from lxml import html
	  File "/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/html/__init__.py", line 42, in <module>
	    from lxml import etree
	ImportError: dlopen(/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so, 2): Library not loaded: /opt/local/lib/libxml2.2.dylib
	  Referenced from: /Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so
	  Reason: Incompatible library version: etree.so requires version 12.0.0 or later, but libxml2.2.dylib provides version 10.0.0
 
使用otool可以看到，其依赖于已经删除的
需要重新安装lxml（python需要安装lxml来获得此库），但是需要注意，由于HoverCraft需要python3.3以上，如果你电脑上的默认python版本不是3.3，则安装的时候需要注意，如使用easy_install安装，需要使用python3.3版本的easy_install:

	> wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | python
或

	> wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | python3

具体可以参考[easy_install官方主页][easy_install]。

然后使用easy_install3安装lxml:

	easy_install-3.3 lxml
 



Mac-JK:examples it$ easy_install lxml
Searching for lxml
Reading http://pypi.python.org/simple/lxml/
Best match: lxml 3.3.2
Downloading https://pypi.python.org/packages/source/l/lxml/lxml-3.3.2.tar.gz#md5=a3ea7bf74b718ecb46d9fd5198eec92d
Processing lxml-3.3.2.tar.gz
Writing /var/folders/02/6tlyskm93ksf1nyst7mrhhk00000gn/T/easy_install-plhlfL/lxml-3.3.2/setup.cfg
Running lxml-3.3.2/setup.py -q bdist_egg --dist-dir /var/folders/02/6tlyskm93ksf1nyst7mrhhk00000gn/T/easy_install-plhlfL/lxml-3.3.2/egg-dist-tmp-5QsuUy
Building lxml version 3.3.2.
Building without Cython.
Using build configuration of libxslt 1.1.26
/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/distutils/dist.py:267: UserWarning: Unknown distribution option: 'bugtrack_url'
  warnings.warn(msg)
Adding lxml 3.3.2 to easy-install.pth file

Installed /Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/lxml-3.3.2-py2.7-macosx-10.6-intel.egg
Processing dependencies for lxml
Finished processing dependencies for lxml
Mac-JK:examples it$ hovercraft codingDojo.rst codingDojo
Traceback (most recent call last):
  File "/Library/Frameworks/Python.framework/Versions/3.3/bin/hovercraft", line 9, in <module>
    load_entry_point('hovercraft==1.2.dev0', 'console_scripts', 'hovercraft')()
  File "/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/hovercraft-1.2.dev0-py3.3.egg/hovercraft/__init__.py", line 16, in main
    from lxml import html
  File "/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/html/__init__.py", line 42, in <module>
    from lxml import etree
ImportError: dlopen(/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so, 2): Library not loaded: /opt/local/lib/libxml2.2.dylib
  Referenced from: /Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so
  Reason: Incompatible library version: etree.so requires version 12.0.0 or later, but libxml2.2.dylib provides version 10.0.0
Mac-JK:examples it$ which lxml
Mac-JK:examples it$ sudo find / -name lxml
Password:
find: /dev/fd/3: Not a directory
find: /dev/fd/4: Not a directory
/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/lxml-3.3.2-py2.7-macosx-10.6-intel.egg/lxml
/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml
Mac-JK:examples it$ otool -L /Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so
/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so:
	/opt/local/lib/libxslt.1.dylib (compatibility version 3.0.0, current version 3.28.0)
	/opt/local/lib/libexslt.0.dylib (compatibility version 9.0.0, current version 9.17.0)
	/opt/local/lib/libxml2.2.dylib (compatibility version 12.0.0, current version 12.1.0)
	/opt/local/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.8)
	/usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 169.3.0)
Mac-JK:examples it$ otool -L /Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/lxml-3.3.2-py2.7-macosx-10.6-intel.egg/lxml/etree.so
/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/lxml-3.3.2-py2.7-macosx-10.6-intel.egg/lxml/etree.so:
	/usr/lib/libxslt.1.dylib (compatibility version 3.0.0, current version 3.26.0)
	/usr/lib/libexslt.0.dylib (compatibility version 9.0.0, current version 9.15.0)
	/usr/lib/libxml2.2.dylib (compatibility version 10.0.0, current version 10.8.0)
	/usr/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.5)
	/usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 169.3.0)
Mac-JK:examples it$ cd /opt/local/lib/
-bash: cd: /opt/local/lib/: No such file or directory
Mac-JK:examples it$ sudo find / -name libxml2.2.dylib
Password:
Sorry, try again.
Password:
Sorry, try again.
Password:
Sorry, try again.
sudo: 3 incorrect password attempts
Mac-JK:examples it$ sudo find / -name libxml2.2.dylib
Password:
/Applications/Vagrant/embedded/lib/libxml2.2.dylib
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS7.0.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator5.1.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator6.1.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator7.0.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.8.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.9.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode4.6.3.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS6.1.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode4.6.3.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator5.1.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode4.6.3.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator6.1.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode4.6.3.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.7.sdk/usr/lib/libxml2.2.dylib
/Applications/Xcode4.6.3.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.8.sdk/usr/lib/libxml2.2.dylib
find: /dev/fd/3: Not a directory
find: /dev/fd/4: Not a directory
/Users/it/Library/Developer/Xcode/iOS DeviceSupport/5.1 (9B176)/Symbols/usr/lib/libxml2.2.dylib
/Users/it/Library/Developer/Xcode/iOS DeviceSupport/5.1.1 (9B206)/Symbols/usr/lib/libxml2.2.dylib
/Users/it/Library/Developer/Xcode/iOS DeviceSupport/6.0.1 (10A523)/Symbols/usr/lib/libxml2.2.dylib
/Users/it/Library/Developer/Xcode/iOS DeviceSupport/6.1 (10B141)/Symbols/usr/lib/libxml2.2.dylib
/Users/it/Library/Developer/Xcode/iOS DeviceSupport/6.1.3 (10B329)/Symbols/usr/lib/libxml2.2.dylib
/Users/it/Library/Developer/Xcode/iOS DeviceSupport/7.0.2 (11A501)/Symbols/usr/lib/libxml2.2.dylib
/Users/it/Library/Developer/Xcode/iOS DeviceSupport/7.0.4 (11B554a)/Symbols/usr/lib/libxml2.2.dylib
/usr/lib/libxml2.2.dylib
/usr/local/Cellar/libxml2/2.9.1/lib/libxml2.2.dylib
/usr/local/rvm/gems/ruby-2.1.1/gems/nokogiri-1.6.1/ext/nokogiri/tmp/x86_64-apple-darwin12.5.0/ports/libxml2/2.8.0/libxml2-2.8.0/.libs/libxml2.2.dylib
/usr/local/rvm/gems/ruby-2.1.1/gems/nokogiri-1.6.1/ports/x86_64-apple-darwin12.5.0/libxml2/2.8.0/lib/libxml2.2.dylib
Mac-JK:examples it$ otool -L /usr/local/rvm/gems/ruby-2.1.1/gems/nokogiri-1.6.1/ports/x86_64-apple-darwin12.5.0/libxml2/2.8.0/lib/libxml2.2.dylib
/usr/local/rvm/gems/ruby-2.1.1/gems/nokogiri-1.6.1/ports/x86_64-apple-darwin12.5.0/libxml2/2.8.0/lib/libxml2.2.dylib:
	/usr/local/rvm/gems/ruby-2.1.1/gems/nokogiri-1.6.1/ports/x86_64-apple-darwin12.5.0/libxml2/2.8.0/lib/libxml2.2.dylib (compatibility version 11.0.0, current version 11.0.0)
	/usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 169.3.0)
	/usr/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.5)
	/usr/lib/libiconv.2.dylib (compatibility version 7.0.0, current version 7.0.0)
Mac-JK:examples it$ otool -L /Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so
/Library/Frameworks/Python.framework/Versions/3.3/lib/python3.3/site-packages/lxml-3.3.1-py3.3-macosx-10.6-intel.egg/lxml/etree.so:
	/opt/local/lib/libxslt.1.dylib (compatibility version 3.0.0, current version 3.28.0)
	/opt/local/lib/libexslt.0.dylib (compatibility version 9.0.0, current version 9.17.0)
	/opt/local/lib/libxml2.2.dylib (compatibility version 12.0.0, current version 12.1.0)
	/opt/local/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.8)
	/usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 169.3.0)
Mac-JK:examples it$ hovercraft codingDojo.rst codingDojo
<string>:109: (ERROR/3) Document may not end with a transition.
Mac-JK:examples it$

[easy_install]: https://pypi.python.org/pypi/setuptools#id137
