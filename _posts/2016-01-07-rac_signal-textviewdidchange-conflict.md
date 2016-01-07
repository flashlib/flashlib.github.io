---
layout: post_page
title: 【RAC】rac_textSignal会阻止textViewDidChange委托方法调用
---
前几天遇到一个Bug，UITextView的```textViewDidChange```委托方法始终不被调用，最后通过定位，才发现项目中使用了RAC，该textview已经使用了```[textview rac_textSignal]```，怀疑此方法已经把```textViewDidChange```截获，查看源码，果然如下：

```
- (RACSignal *)rac_textSignal {
	@weakify(self);
	RACSignal *signal = [[[[[RACSignal
		defer:^{
			@strongify(self);
			return [RACSignal return:RACTuplePack(self)];
		}]
		concat:[self.rac_delegateProxy signalForSelector:@selector(textViewDidChange:)]]
		reduceEach:^(UITextView *x) {
			return x.text;
		}]
		takeUntil:self.rac_willDeallocSignal]
		setNameWithFormat:@"%@ -rac_textSignal", [self rac_description]];

	RACUseDelegateProxy(self);

	return signal;
}
```

其实既然使用了RAC，直接使用```rac_textSignal```即可，这样开始的效率也更好，实现也更优雅。