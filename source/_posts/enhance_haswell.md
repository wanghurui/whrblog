title: 提升Intel 4代处理器性能锁定全核倍频
toc: true
author: Whr
date: 2021-09-20 20:59:14
tags:
---
Z系列可以直接解锁全核倍频。对于B和H系列，如果你的主板BIOS选项中有 （CPU倍频 all core），也可以解锁全核倍频
<!-- more -->
* * *
# 工具
1. 主板BIOS（2015年3月左右或者官方超频BIOS)
2. [UEFI Tool](https://github.com/wanghurui/whrblog/releases/tag/Blog)

# 替换BIOS中的微码
运行`UEFI.BIOS.Updater.1.66 `文件夹中的`ubu.bat`。`ubu.bat`可以自己识别文件夹中的BIOS文件，如果没有自动识别，提示载入一个文件，选择bios文件即可。
## 更新CPU微码

![image.png](https://i.loli.net/2021/09/20/oMhPRSwUak18Ocn.png)

## 更新HasWell架构微码
输入7回车，更新CPU微码

![image.png](https://i.loli.net/2021/09/20/nb7tU8vcVZ5G61M.png)  
输入1回车，更新HasWell架构微码
![image.png](https://i.loli.net/2021/09/20/bgHBlJXjqrQn5o2.png)  
## 解锁HasWell限制
输入7回车，解锁HasWell限制
![image.png](https://i.loli.net/2021/09/20/d34Ho7UmFQchx8G.png)  
![image.png](https://i.loli.net/2021/09/20/31oLk86umDrlOwW.png)    

输入0回车，完成BIOS编辑  
输入1回车，将新BIOS保存到当前目录
输入任意键结束程序，程序目录下便有最新的BIOS了


# 刷写BIOS
把它放入_FAT32_格式U盘根目录中  
详细刷写BIOS请参考主板官网的帮助

# 设置BIOS为all core

cpu倍频必须必须选择所有内核（all core），否则解锁无效。在All core 填入你的CPU单核最大频率即可。如E3 1231V3 单核最大倍频为38  

保存退出重启电脑即可

----
如果你打开电脑，打开CPUZ发现所有核心都运行在了最高倍频，那么恭喜，你锁住了。🎉

如果没有，请继续往下看。

# Oops！我没锁住🤔
> Make a screenshot of `regedit` with expanded key `HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0`  

> ![image.png](https://i.loli.net/2021/07/20/Mo9ZYUlrVO5cPWI.png)

> Your BIOS has microcode with `0x06` version, but Windows update it to `0x28` version.
Delete or rename file `C:\Windows\System32\mcupdate_GenuineIntel.dll`

[https://www.bios-mods.com/forum/Thread-Biostar-B85W-CPU-frequency-problem](https://www.bios-mods.com/forum/Thread-Biostar-B85W-CPU-frequency-problem)

大意就是我修改了BIOS中的微码为`0x06`，但是系统把微码更新成了`0x28`。  
### 删除系统微码

在PE中删除或重命名系统微码文件`C:\Windows\System32\mcupdate_GenuineIntel.dll`

![image.png](https://i.loli.net/2021/07/20/3BbGqs95YDdMVIj.png)  
还是锁不住🤔

### 使用ThottleStop锁倍频
> Show FIVR and TPL information in ThrottleStop.

![image.png](https://i.loli.net/2021/07/21/mzlWRBYjx3sKS9F.png)  
设置ThottleStop中的FIVR的Turbo Ratio Limits为CPU单核最大倍频。修改即时生效。

最后把ThottleStop设置为开机启动就行了

----

🎉如果你锁住了，可以送我一条评论吗🎉

----


参考资料
- [https://www.bios-mods.com/forum/Thread-Biostar-B85W-CPU-frequency-problem](https://www.bios-mods.com/forum/Thread-Biostar-B85W-CPU-frequency-problem)
- [https://zhuanlan.zhihu.com/p/54535319](https://zhuanlan.zhihu.com/p/54535319)
- [https://www.techpowerup.com/forums/threads/how-can-i-get-throttlestop-to-auto-load-when-windows-starts-up.230371/](https://www.techpowerup.com/forums/threads/how-can-i-get-throttlestop-to-auto-load-when-windows-starts-up.230371/)