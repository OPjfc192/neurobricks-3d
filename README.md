# NeuroBricks 3D

**Build neural networks from click-to-add 3D blocks, validate tensor shapes in real time, and launch real PyTorch training with one click.**

在 3D 空间里像搭积木一样搭建神经网络，实时校验张量形状，一键启动真实的 PyTorch 训练。

**[English](#english) | [中文](#中文)**

<!-- TODO: demo gif — place a ~60s screen recording at assets/demo.gif, then uncomment:
![Demo](assets/demo.gif)
-->

---

<a id="english"></a>
## English

### What is NeuroBricks 3D?

NeuroBricks 3D is a Windows desktop workbench for one engineer running small-data, single-machine supervised-learning experiments. Click a layer card to add its block to the 3D scene in network order; tensor shapes are inferred live, and every controlled run is organized as traceable Study → Experiment → Attempt → Claim evidence.

### Features

- **Click-to-add 3D building** — 12 layer types (Conv2D, MaxPool2D, AvgPool2D, Linear, ReLU, Sigmoid, Tanh, BatchNorm2d, LayerNorm, Dropout, Flatten, Input), automatically arranged in network order
- **8 classic model presets** — LeNet-5, AlexNet, VGG-16, ResNet-18, GoogLeNet, MLP, SimpleCNN, U-Net encoder (an encoder preset, not a segmentation promise)
- **Real-time shape validation** — tensor shapes propagate layer by layer; mismatches are highlighted with expected-vs-actual comparison and fix suggestions
- **Bounded supervised tasks** — image classification from MNIST / CIFAR-10 or custom class folders, plus CSV tabular regression (UTF-8 / GBK auto-detected)
- **Local PyTorch training** — self-contained Python sidecar; CUDA GPU auto-detected with graceful CPU fallback; no Python setup required
- **Trustworthy experiment records** — content fingerprints, sealed test sets, strict comparison groups, Attempt restart lineage, pre-registered claims, three-way statistical verdicts, confusion diagnostics, and append-only audit events
- **Training visualization** — live loss/accuracy or MAE curves, training logs, and variance-aware comparisons
- **Image-model inference** — completed image-classification runs become model cards; CSV regression runs remain in the experiment evidence workflow
- **Live code panel** — see the PyTorch code update in real time as you build; one-click copy
- **One-way evidence export** — Study reports and experiment manifests preserve provenance/trust labels; modified external reruns never inherit controlled-execution trust

### Deliberate boundary

The current product promise is **small datasets, one Windows machine / one consumer GPU, supervised learning**. It supports image classification and bounded CSV regression. It deliberately does not promise detection, segmentation, multi-label classification, LLM fine-tuning, multimodal pipelines, clusters, multi-GPU scheduling, or cloud multi-tenancy.

### Tech Stack

| Layer | Technology | Notes |
| --- | --- | --- |
| App shell | Tauri v1 | Lightweight desktop shell, Rust backend |
| Frontend | React 18 + TypeScript | UI and state management |
| 3D rendering | React Three Fiber + Three.js | 3D scene and block rendering |
| State | Zustand | Lightweight reactive stores |
| Build | Vite | Frontend dev & build |
| Backend | Rust | Process management, filesystem, event bridge |
| Training engine | Python + PyTorch | Bundled sidecar, CUDA support |
| Packaging | PyInstaller + Tauri portable build | Self-contained Windows x64 application package |

### Install

1. Download the latest `NeuroBricks-3D-x.x.x-windows-x64-portable-*.zip` from [Releases](https://github.com/OPjfc192/neurobricks-3d/releases)
2. Extract the complete ZIP and run `NeuroBricks 3D.exe`

The training engine and built-in datasets are bundled inside the installer. End users do not install Python or the CUDA toolkit. GPU training requires a compatible NVIDIA GPU driver; otherwise the same bundled runtime uses CPU.

> System requirements: Windows 10/11 (64-bit)

### Development

Prerequisites: Node.js 18+, Rust toolchain (rustup), and 64-bit Python 3.12 (only needed to rebuild the release sidecar).

```bash
git clone https://github.com/OPjfc192/neurobricks-3d.git
cd neurobricks-3d

npm install          # frontend dependencies
npm run dev          # browser UI simulation; does not start Python
npm run tauri dev    # desktop development; probes a Python env or bundled sidecar
npm run package:windows # rebuild verified sidecar, then build the portable Windows app
```

Desktop development probes `NEUROBRICKS_PYTHON`, active/project environments, common Conda locations, PATH, and finally an existing bundled sidecar. A candidate is selected only after it answers the capability protocol. Release builds never borrow the end user's Python: `npm run package:windows` creates an isolated, version-pinned CUDA sidecar and rejects packaging if image classification, CSV regression, or the CUDA build is missing. The portable format is intentional: the complete CUDA runtime exceeds the 2 GB upstream limit of Tauri v1's NSIS/WiX installer path.

### Roadmap

- [x] Strict Study / Experiment / Attempt / Claim evidence chain
- [x] Sealed-test claim adjudication and confusion diagnostics
- [ ] Cluster/block bootstrap for correlated group or temporal samples
- [ ] Understanding engine — feature map visualization

Task gamification and SSH training remain backlog ideas, not current product commitments.

### License

[MIT](LICENSE) © nanliuqi, OPjfc192 and contributors

---

<a id="中文"></a>
## 中文

### NeuroBricks 3D 是什么？

一款服务于“小数据、单机单卡、监督式学习”的 Windows 实验工作台，面向小团队里一个人扛起 AI 模块的工程师。点击层组件卡片即可将积木按网络顺序加入 3D 场景，张量形状实时推导；每次受控训练则自动进入 Study → Experiment → Attempt → Claim 的可追溯证据链。

### 功能特性

- **3D 积木搭建** — 12 种层类型（Conv2D、MaxPool2D、AvgPool2D、Linear、ReLU、Sigmoid、Tanh、BatchNorm2d、LayerNorm、Dropout、Flatten、Input），点击即按网络顺序加入
- **8 个经典模型预设** — LeNet-5、AlexNet、VGG-16、ResNet-18、GoogLeNet、MLP、SimpleCNN、U-Net 编码器（仅编码器预设，不承诺分割任务）
- **实时形状校验** — 张量形状逐层推导，参数不匹配时红色高亮 + 期望/实际对比 + 修复建议
- **有边界的监督任务** — MNIST / CIFAR-10 与自定义类别文件夹用于图像分类；CSV 用于表格监督回归（UTF-8 / GBK 自动识别）
- **本地 PyTorch 训练** — 训练引擎整体内置，CUDA GPU 自动检测、CPU 自动降级，无需安装 Python
- **可信实验档案** — 数据内容指纹、封存测试集、严格可比分组、Attempt 重启谱系、主张预注册、三值统计裁决、混淆诊断与只追加审计
- **训练可视化** — 实时 Loss/Accuracy 或 MAE 曲线、训练日志与带方差提示的实验对比
- **分类与回归推理** — 图像分类卡片提供 Top-5；CSV 回归卡片按训练时特征顺序接收原始数值并复用训练集标准化参数，输出单一预测值
- **实时代码面板** — 搭积木的同时实时查看对应 PyTorch 代码，一键复制
- **单向证据导出** — Study 报告与实验 manifest 保留来源和可信等级；导出后修改并在外部重跑不会继承受控执行身份

### 刻意边界

当前产品承诺锁在 **小数据集、Windows 单机单张消费级显卡、监督式学习**：做深图像分类与有界 CSV 回归；明确不承诺检测、分割、多标签分类、LLM 微调、多模态、集群、多 GPU 调度或云多租户。

### 技术栈

| 层级 | 技术 | 说明 |
| --- | --- | --- |
| 应用外壳 | Tauri v1 | 轻量桌面壳，Rust 后端 |
| 前端 | React 18 + TypeScript | UI 与状态管理 |
| 3D 渲染 | React Three Fiber + Three.js | 三维场景与积木渲染 |
| 状态管理 | Zustand | 轻量响应式 store |
| 构建工具 | Vite | 前端开发与构建 |
| 后端 | Rust | 进程管理、文件系统、事件桥接 |
| 训练引擎 | Python + PyTorch | 内置 sidecar，支持 CUDA |
| 打包 | PyInstaller + Tauri 便携构建 | 自包含 Windows x64 应用包 |

### 安装

1. 从 [Releases](https://github.com/OPjfc192/neurobricks-3d/releases) 下载最新的 `NeuroBricks-3D-x.x.x-windows-x64-portable-*.zip`
2. 完整解压 ZIP，双击 `NeuroBricks 3D.exe`

训练引擎与内置数据集已全部打包在安装程序内。最终用户无需安装 Python 或 CUDA 工具链；GPU 训练需要兼容的 NVIDIA 显卡驱动，没有兼容 GPU/驱动时使用同一内置运行时转为 CPU。

> 系统要求：Windows 10/11（64 位）

### 开发环境

前置要求：Node.js 18+、Rust toolchain（rustup）、64 位 Python 3.12（仅重新构建发布 sidecar 时需要）。

```bash
git clone https://github.com/OPjfc192/neurobricks-3d.git
cd neurobricks-3d

npm install          # 前端依赖
npm run dev          # 浏览器 UI 模拟，不启动 Python
npm run tauri dev    # 桌面开发，探测可用 Python 环境或内置 sidecar
npm run package:windows # 重建并校验 sidecar，再构建 Windows 便携应用包
```

桌面开发会依次检查 `NEUROBRICKS_PYTHON`、项目/已激活环境、常见 Conda 路径、PATH 和已有内置 sidecar；候选必须通过能力协议才会被采用。正式发布绝不借用最终用户电脑上的 Python：`npm run package:windows` 会创建隔离、锁版本的 CUDA sidecar，并在图像分类、CSV 回归或 CUDA build 任一能力缺失时拒绝打包。采用便携包是有意设计：完整 CUDA 运行时超过 Tauri v1 的 NSIS/WiX 上游 2 GB 限制，强行生成单文件安装器会得到不可交付产物。

### 路线图

- [x] Study / Experiment / Attempt / Claim 严格证据链
- [x] 封存测试集主张裁决与混淆诊断
- [ ] 面向 group/temporal 相关样本的 cluster/block bootstrap
- [ ] 理解引擎 — feature map 可视化

任务游戏化与 SSH 云训练只保留在 backlog，不属于当前产品承诺。

### 许可证

[MIT](LICENSE) © nanliuqi, OPjfc192 and contributors

---

如果这个项目对你有帮助，欢迎 ⭐ Star 支持一下！ / If you find this project useful, a ⭐ is much appreciated!
