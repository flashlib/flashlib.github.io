---
layout: post_page
title: XCode升级导致插件失效的解决方法
---
在Terminal中执行以下代码：

```
find ~/Library/Application\ Support/Developer/Shared/Xcode/Plug-ins -name Info.plist -maxdepth 3 | xargs -I{} defaults write {} DVTPlugInCompatibilityUUIDs -array-add `defaults read /Applications/Xcode.app/Contents/Info.plist DVTPlugInCompatibilityUUID`
```

具体原理请移步这里:[Xcode升级后插件失效的原理与修复办法](http://joeshang.github.io/2015/04/10/fix-xcode-upgrade-plugin-invalid/)。