---
layout: post_page
title: jekyll安装的痛苦记忆
---

自从我的免费空间提供商把网站关闭之后，我已经几年没有写博客了。虽然在[CSDN][csdn]上面偶尔捣鼓一下，但是多数都是转载，且总是不上心，我想原因可能是没有什么归属感吧！最近内心又有一丝冲动，想拥有自己的独立博客，偶然发现[Github Pages][pages]，非常喜欢这种程序员的博客，故决定一试。

我为自己重生的博客的第一篇文章想过很多个标题，却重来不曾想到是以一篇我与jekyll战斗的痛苦回忆开始的。。。

###安装homebrew
在网上找到安装homebrew的命令：

	ruby -e "$(curl -fsSL https://raw.github.com/homebrew/homebrew/install)"

结果地址已经变了，直接去[homebrew的主页][homebrew]找到下面的命令：

	ruby -e "$(curl -fsSL https://raw.github.com/homebrew/homebrew/go/install)"

安装成功.

###安装jekyll

	gem install jekyll
安装失败，以为是连不上源，按网上的介绍，替换gem的sources：

	sudo gem sources --remove http://rubygems.org/
	sudo gem sources -a http://ruby.taobao.org/

但是Taobao的sources也不可用！

查到可以通过-V参数显示详细信息：

	sudo gem install jekyll -V

输出显示jekyll要求gem在1.9版本以上，需要update：

	sudo gem update --system

这次真的连不上网络，查到gem可以使用代理：

	export http_proxy "http://localhost:8087"

用环境变量不好使，改成-p搞定：

	sudo gem update --system -p http://localhost:8087

这下终于可以安装jekyll了：

	sudo gem install jekyll -V

###运行jekyll
下载了一个漂亮的主题[kasper][kasper]，赶紧运行看看效果：

	jekyll server

失败。。。错误提示找不到pygments.rb, list显示一下：

	gem list --local

显示已经有pygments.rb 0.5.4了！

google后看到有人说安装0.5.0可以：

	sudo gem uninstall pygments.rb
	sudo gem install pygments.rb --version "=0.5.0"
	jekyll server --trace
还是一样不成功！

看看我ruby和python版本：

	ruby --version
	ruby 1.8.X

	python --version
	Python 2.7.6
都满足要求啊!环境变量有问题吗？

	echo $PATH
未发现问题。

难道因为我同时安装了python2.7.6和python3.3的原因？可是我的python2.7.6是默认的啊！

有人说重新安装python2.7.x可以解决，于是重新安装。。。。

	jekyll server
*居然真的解决了！*[ksaper]运行起来了！仔细想想，应该是后装python3.3时，改变了某些环境变量。

###安装nokogiri插件
由于[kasper][kasper]稍显复杂，我在[Jekyll Themes]挑了一个我比较喜欢的简洁主题([Vanilla Bean Creme])，下载到本地看看：

	cd ~/vbc
	jekyll server

悲剧再次上演，提示nokogiri没有安装！好吧，经过上面的磨练这个对我来说这只是小菜一碟！

	gem install nokogiri
什么情况？又失败了！提示nokogiri需要ruby1.9.x以上，我的ruby太老了!!好吧，升级就是了！

###升级ruby
用homebrew升级吧，先找一下，有没有：

	brew search ruby

有，看来可以装：

	brew update ruby

哦，update是用来升级homebrew本身的，需要用upgrade命令：

	brew upgrade ruby

提示我ruby不是用homebrew升级的，难道需要用MacPorts?

先更新一下MacPorts:

	sudo port selfupdate

失败，应该是代理的问题，在配置文件里加上代理：
编辑 /opt/local/etc/macports/macports.conf，在文件的末尾加入： 

	proxy_override_env yes 
	proxy_http 127.0.0.1:1331 
再来：

	sudo port selfupdate -v
	sudo port upgrade ruby -v
失败，好像也不能用MacPorts升级！

查一下，哦，原来要用rvm安装ruby:

###安装rvm

	sudo bash < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)
	rvm -v
	rvm list known

使用sudo安装到多用户，据说这样就可以不用重新配置用户权限了（误！这是一个大大的坑）

	sudo rvm install ruby --head

失败！尝试半天，google半天，通过下面改权限：

	sudo chown root:admin /usr/local/bin/brew

还是不行！最后想起在rvm安装完成之后提示了什么“只差一步就成功了“，难道是权限要配？去rvm官网看，果然现在都需要配权限了！上面的坑把我活埋了！
配置rvm权限：

	sudo /usr/sbin/dseditgroup -o edit -a it -t user rvm

再次安装ruby:

	rvm install ruby --head
	ruby --version
ruby安装成功！

###安装rvm依赖包：
现在来安装依赖包：

	rvm requirements
又不行！提示:

	opssl


在stackoverflow找到[这篇帖子][stackoverflow]，应该是opsslt版本的问题，因为我即安装了homebrew又安装了MacPorts，两者都有openssl，而在$PATH环境变量中，MacPorts的目录在前面，其openssl版本是旧的，用下面命令显示确实如此：

	echo $PATH

先按[这篇帖子][stackoverflow]所说把MacPorts卸载了：

	sudo port -f uninstall installed
	sudo rm -rf opt/local/ \
	/Applications/DarwinPorts \
	/Applications/MacPorts \
	/Library/LaunchDaemons/org.macports.* \
	/Library/Receipts/DarwinPorts*.pkg \
	/Library/Receipts/MacPorts*.pkg \
	/Library/StartupItems/DarwinPortsStartup \
	/Library/Tcl/darwinports1.0 \
	/Library/Tcl/macports1.0 \
	~/.macports

修改/usr/local/的所有权为当前用户，这样就不用每次都输入sudo了：

	ls -al /usr/local
	sudo chown -R username /usr/local/

再次安装：

	rvm requirements
还是失败！

强制使用brew的openssl:

	brew list
	brew info openssl
	brew link --force openssl

把/usr/local/bin放在前面：

	export PATH="/usr/local/bin:$PATH"

再来一次：

	rvm requirements
成功！

	rvm install ruby --head
成功！

	gem install nokogiri
成功！

终于可以运行了吧！

	jekyll server
。。。
衰神再次降临人间，显示如下错误：

	/Library/ruby/Site/1.8/rubygems/core_ext/kernel_require.rb:55:in `gem_original_require': no such file to load -- nokogiri (LoadError)
google引领我来到了[这里][nokogiri_install]，原因是我的nokogiri安装到1.8的ruby上了，最简单的处理办法是把nokogiri删除，再重新安装一下：

	gem uninstall nokogiri
	gem install nokogiri
安装成功后，用以下命令查看nokogiri的安装位置：

	which nokogiri
结果显示已经安装到最新的2.1.1下面。

最后一次，真的是最后一次了，运行：

	jekyll server
终于，可爱的[Vanilla Bean Creme]跑起来了！

###人间正道是仓桑！
这么多坑，我终于还是爬出来了，真心不容易啊！为了不让看官您再受苦受累，我觉得我应该总结一条康庄大道出来，这个纯粹是根据我上面的经历，反推出来的，如果有更多的坑，绝对是故意的！

* 安装或升级gem到最新版本；
* 通过gem安装jekyll，按需要设置代理服务器；
* 这时候没有使用插件的网站应该就可以启动了；
* 如果使用了pygments插件，且运行失败：确认python版本为2.7.x，如果同时安装了python3.x，需要保证python指向的是python2.7.x，而不是python3.x。如果遇到问题，可以重新安装python2.7.x试试；
* 安装或升级到最新版本的rvm;
* 配置rvm用户权限；
* 安装rvm依赖:如果失败，如openssl版本不一致等，需要确认是否同时安装了homebrew和MacPorts引起冲突，建议删除其一，本文是使用homebrew安装的，具体见上；
* 安装最新版本的ruby;
* 安装nokogiri。

###尾声：jekyll的摘要(excerpt)功能
jekyll默认把第一段做为摘要(excerpt)，我使用的[Vanilla Bean Creme]没有使用`post.excerpt`来显示摘要，而是用的`truncatewords:30`来实现的。当我将其修改为`post.excerpt`时，居然整个文章都显示出来了。幸好[kasper]的expert是正常的，经过对比，我发现是由于[Vanilla Bean Creme]的post文件全是dos格式的，`:set fileformat=unix`将其修改为unix后问题解决。 

[csdn]: http://blog.csdn.net/hungboy0
[nokogiri_install]: http://www.rqna.net/qna/qvrpin-jekyll-defaults-to-system-ruby-version-instead-of-rvm-version.html
[homebrew页]: http://brew.sh/
[kasper]: https://github.com/rosario/kasper
[Jekyll Themes]: http://jekyllthemes.org/
[Vanilla Bean Creme]: http://jekyllthemes.org/themes/vanilla-bean-creme/
[stackoverflow]: http://stackoverflow.com/a/22016349/1607173
[pages]: http://pages.github.com/
