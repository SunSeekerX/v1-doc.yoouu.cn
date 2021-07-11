# power-shell

## 刷新环境变量

**powershell**

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine")
# or
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

**cmd**

> open cmd commend prompt window.
>
> input `set PATH=C` -> this will refresh the environment variables. close and restart cmd window. input `echo %PATH%` to test.

```shell
set PATH=C
# 关闭窗口重新打开，输入
echo %PATH%
```

## 代理

```powershell
# 设置代理
netsh winhttp set proxy 127.0.0.1:1080
# 取消代理
netsh winhttp reset proxy
# 查看代理
netsh winhttp show proxy

# clash 复制 power shell
$Env:http_proxy="http://127.0.0.1:7890";$Env:https_proxy="http://127.0.0.1:7890"
# clash 复制 cmd
set http_proxy=http://127.0.0.1:7890 & set https_proxy=http://127.0.0.1:7890
```

## powershell 因为在此系统上禁止运行脚本…

> 最近在自己电脑上使用 react-native 初始化项目出现了下面的错误，猜测应该是微软更新导致

```bash
react-native : 无法加载文件 C:\Users\SunSeekerX\AppData\Roaming\npm\react-native.ps1，因为在此系统上禁止运行脚本。有关
详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ react-native init demo
+ ~~~~~~~~~~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

**解决**

1. win+X 启动 `windows PowerShell`（管理员）

2. 若要在本地计算机上运行您编写的未签名脚本和来自其他用户的签名脚本，请使用以下命令将计算机上的 执行策略更改为 RemoteSigned

   ```powershell
   # 更改执行策略
   set-ExecutionPolicy RemoteSigned

   # 查看执行策略
   get-ExecutionPolicy
   ```

## 开启 win10 卓越性能模式

桌面按住`shift`加上鼠标右键选择在此处打开`powershell`窗口执行

```powershell
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61

# 输出
PS C:\Users\SunSeekerX\Desktop> powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
电源方案 GUID: 124d9932-ad06-41b8-85a6-342c4b5c6db9  (卓越性能)
PS C:\Users\SunSeekerX\Desktop>
```

去电源选项选择卓越性能就 ok 了

![](https://static.yoouu.cn/imgs/doc/basic/power-shell/super-power.png)
