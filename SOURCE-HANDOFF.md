# NeuroBricks 3D：源码交付与开发说明

交付日期：2026-10-24（北京时间）  
项目版本：0.1.0  
交付性质：最新开发工作区的源码快照，不是可双击运行的应用程序。

## 1. 收到后先做什么

1. 完整解压同目录的 `NeuroBricks-3D-0.1.0-source-20261024-104024.zip`，进入其中的 `neurobricks-3d` 文件夹。
2. 确认该文件夹直接包含 `package.json`、`package-lock.json`、`src`、`src-tauri`，不要在它的上一级运行 npm。
3. 根据需要选择第 4 节的浏览器界面预览，或第 5 节的桌面真实训练。
4. 先阅读本文件；包内 `SOURCE-HANDOFF.md` 是同一份说明，即使只转发 ZIP，也能找到它。

本包包含尚未提交 Git 的最新修改与新增源码，不是从历史提交直接导出的旧版本。未附带原作者的 `.git` 历史与远程配置。请勿以同名旧应用、旧解压目录或旧提交的界面判断本包内容。

## 2. 包含与不包含

包含：React/TypeScript 前端、Rust/Tauri 后端、Python/PyTorch sidecar 源码、单元与组件测试、教学文档、截图与图标、配置文件、依赖锁文件，以及现有构建和交付脚本。

不包含：`node_modules`、Rust `target`、前端 `dist`、Python 虚拟环境、PyInstaller 编译结果、CUDA/PyTorch 二进制运行时、下载的数据集、模型权重、个人实验档案、缓存、日志、临时测试包、编辑器个人配置和 Git 历史。

因此源码 ZIP 只有 MB 级，而原开发文件夹可能达到数十 GB，这是正常的：依赖和编译产物由接收方按需恢复。它不是完整应用包，也不是开箱即用的离线训练包。

`src-tauri/sidecars/nb-trainer/data/README-SOURCE-ONLY.md` 是交付时添加的数据目录占位说明，不是数据集。原项目中的源码文件未被改写。

## 3. 目录导航与当前开发范围

| 路径 | 职责 |
| --- | --- |
| `src/components` | 工作区、面板、3D 场景、训练与通用 UI |
| `src/content/resultInterpretation.ts` | 结果解读文案的共享来源 |
| `src/stores` | Zustand 状态；不要随意增加重复业务状态 |
| `src/utils` | 形状、严格指标、比较、预检查和可信投影 |
| `src/*Runtime.ts` | 训练、课题、实验和主张工作流 |
| `src/__tests__` | 前端单元、组件测试与尚未运行的 E2E 规格 |
| `src-tauri/src` | 文件、设备、子进程、审计持久化等 Rust 实现 |
| `src-tauri/sidecars/nb-trainer` | Python 训练、推理、协议与构建脚本 |
| `public/chart.html` | 独立曲线窗口，和 React 内嵌图不是同一实现 |
| `docs/教学` | 快速上手、演示脚本、编号人工验收清单 |
| `scripts/package-windows-portable.ps1` | 完整 Windows 便携应用的后续构建流程 |
| `SOURCE-SNAPSHOT.json` | 本次收录文件的大小、SHA-256、范围与验证记录 |

本次快照包含教学区、新手导航、模型库键盘操作、网络结构清单、形状合法性修复、参数量安全展示，以及 R1/R2 的“如何读图／如何比较／结果说明”。这些入口只解释或导航，不自动修改工程或替用户运行训练。

产品范围仍是小数据集、Windows 单机单卡的监督学习：图像分类和 CSV 表格回归。不把编码器预设当成分割承诺，不把 SSH、集群或大模型微调当成已完成的产品能力。

## 4. 最快启动：只预览前端界面

准备 Node.js 和配套 npm。本次检查环境为 Node.js 24.16.0、npm 11.13.0；当前 happy-dom 测试依赖要求 Node.js >= 20。建议使用 Node.js 22 或 24，不要按历史说明选择 Node.js 18。

在解压后的 `neurobricks-3d` 文件夹中打开 PowerShell：

```powershell
# 当前目录应能看到 package.json
Get-Item .\package.json
npm.cmd ci
npm.cmd run dev
```

打开终端显示的本地地址，通常为 `http://localhost:5173`。结束时在终端按 Ctrl+C。

这一步不需要安装 Python 或 Rust，但没有 Tauri 后端。浏览器演示训练不是真实 GPU 训练，不产生可据此背书的实验结果；目录选择、设备探测、审计持久化等桌面能力也不能据浏览器表现认定已经可用。

## 5. 桌面开发与真实训练

### 5.1 桌面构建环境

需要 Windows 10/11 x64、Node.js/npm、Rust 的 MSVC 工具链、Visual Studio C++ Build Tools 与 Windows SDK，以及 WebView2 Runtime。首次安装 npm/Rust 依赖通常需要网络；源码包不包含工具链。

本机检查时 Rust 为 `rustc 1.96.0`，这是交付环境记录，不是新增的最低版本承诺。

### 5.2 创建自己的 Python 环境

训练开发与重建发布 sidecar 建议使用 64 位 Python 3.12。无需复制原作者的 Anaconda，也不要直接运行历史 `install-dependencies.bat`、`upgrade-pytorch.bat` 等带本机路径的辅助脚本。

以下命令均在解压后的源码根目录执行：

```powershell
py -3.12 -m venv .\src-tauri\sidecars\nb-trainer\.venv
.\src-tauri\sidecars\nb-trainer\.venv\Scripts\python.exe -m pip install -r .\src-tauri\sidecars\nb-trainer\requirements.txt
$env:NEUROBRICKS_PYTHON = (Resolve-Path .\src-tauri\sidecars\nb-trainer\.venv\Scripts\python.exe).Path
& $env:NEUROBRICKS_PYTHON -c "import torch, torchvision, numpy, pandas, PIL; print(torch.__version__); print(torch.cuda.is_available())"
'{"mode":"capabilities"}' | & $env:NEUROBRICKS_PYTHON -B .\src-tauri\sidecars\nb-trainer\main.py
```

如果没有 `py` 启动器，用已安装 Python 3.12 的真实路径替换第一行的 `py -3.12`，其余命令不依赖原作者用户名。

当前 requirements 固定为 torch 2.11.0+cu128、torchvision 0.26.0+cu128、numpy 1.26.4、pandas 2.2.3、pillow 11.3.0。安装会下载较大的 CUDA/PyTorch 依赖，可能占用数 GB；请提前准备磁盘和网络，不要为了“源码包小”误以为完整训练依赖也很小。

能力探测输出中应出现 `runtime_capabilities`；图像分类和 CSV 回归能力是否可用，以实际返回为准。没有 NVIDIA GPU 时可明确选择 CPU；选中的 CUDA 设备不可用时应重新选择，不承诺静默回退。

### 5.3 启动桌面程序

确认已执行 `npm.cmd ci`，并在同一个设置过 Python 环境变量的终端中执行：

```powershell
npm.cmd run tauri -- dev
```

该命令会启动 Vite 并编译 Rust 桌面壳。首次编译可能较慢、占用较多磁盘空间；`target` 是可重建产物，不是源码缺失。结束时按 Ctrl+C。

本包没有编译好的训练器，因此开发模式应探测上述 Python 环境。发布版本使用独立打包的 sidecar，不能把开发环境的 Python 探测结果当成发布环境验收。

### 5.4 数据集

本包不带下载的 MNIST/CIFAR-10。现有训练代码会尝试按需下载并缓存；首次真实训练需要可访问相应数据源的网络。网络不通时，准备自己的类别图片目录或 CSV，或事先配置合法下载的数据集，不要把占位说明当作数据。

同事自己的实验、模型与导出文件由其本机运行产生，本包不附送原作者的私有运行档案和已解封测试集历史。

## 6. 验证命令与本次检查记录

```powershell
npm.cmd run test:run
npm.cmd run typecheck
npm.cmd run build
cargo test --locked --manifest-path .\src-tauri\Cargo.toml
.\src-tauri\sidecars\nb-trainer\.venv\Scripts\python.exe -B -m unittest discover -s .\src-tauri\sidecars\nb-trainer\tests -p "test_*.py"
```

完整组合命令 `npm.cmd run verify` 会依次执行前端、Rust、Python 测试及构建。它调用 PATH 中的 `python`；使用该命令前，确保 PATH 对应正确环境，不能只设置 `NEUROBRICKS_PYTHON` 就假定 npm 的 Python 测试也会使用它。

本次源码打包前实测：前端 90 个测试文件／1383 项全部通过，`npm.cmd run typecheck` 通过。本次未重新执行 Rust/Python 测试、完整应用构建或干净机器启动，不声称这些项目已经因本次打包而通过。

已有测试警告包括 Three.js `<group>` 在 DOM 测试环境中的提示；生产构建曾有大 chunk 提示。`typecheck` 排除了 `src/__tests__`，不能将其通过表述为测试文件也经过 tsc 检查。Playwright 规格保留但依赖尚未接入，不要把它们称为已运行的 E2E 门禁。

## 7. 以后如果要重新生成完整应用

本次只是源码交付，无需执行本节。确需构建应用时，先准备 Python 3.12、Rust 和 Node 开发环境：

```powershell
npm.cmd run package:windows
```

脚本会创建专用打包虚拟环境、安装依赖、用 PyInstaller 生成训练器并校验能力，然后构建 Windows 便携包。它可能需要大量时间与磁盘空间。

只有已经存在并验证过训练器时才使用 `npm.cmd run package:windows:app-only`。本源码 ZIP 没有训练器，直接运行该命令或直接执行生产 `tauri build` 可能因 `sidecar:verify` 失败，这是预期的环境前置要求，不应通过删除校验来绕过。

## 8. 接手修改纪律与排查提示

- 先建立自己的版本控制或分支，再小范围开发；不要直接覆盖正在测试的原目录。
- 保留 package-lock.json 和 Cargo.lock。依赖下载失败先检查网络与工具链，不要先删除锁文件或执行无范围限制的升级。
- 指标语义沿用 `metricSeries`，可信等级沿用既有协议投影。不要让页面各自猜 Accuracy、百分比或金标。
- 执行可信、比较资格、裁决结果和结论可信是不同维度。PASS、FAIL、INCONCLUSIVE 都不能单独决定金标；说明入口不改变这些规则。
- 受控执行的外部重跑不能自动继承可信身份；非严格对比仍需确认、留痕与水印；封存集评估不能当普通 UI 演示反复消耗。
- 启动报 ENOENT/package.json：回到 ZIP 内真正的 `neurobricks-3d` 根目录。
- 检测不到 Python：先运行第 5.2 节探测，确认依赖可导入、解释器路径正确，然后在同一终端启动桌面。
- 界面存在但无法用桌面能力：确认启动的是 `tauri -- dev` 而非仅 `npm run dev`。
- 文档中的旧截图、历史命令与新界面有差异时，以实际实现和本交付说明为准；保留的历史文档不代表本次新增承诺。

## 9. 文件完整性核验

同目录的 `SHA256SUMS.txt` 给出 ZIP 与本说明的 SHA-256。PowerShell 可计算：

```powershell
Get-FileHash -Algorithm SHA256 .\NeuroBricks-3D-0.1.0-source-20261024-104024.zip
```

ZIP 内 `SOURCE-SNAPSHOT.json` 列出每个原始源码文件的相对路径、大小和 SHA-256，并单独记录交付时生成的说明与占位文件。它用于检查传输完整性，不是对模型效果的背书，也不把本机主人视为密码学对手。
