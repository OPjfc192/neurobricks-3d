// src/types/classicModels.ts
var CLASSIC_MODELS = [
  {
    id: "lenet5",
    name: "LeNet-5",
    year: 1998,
    description: "Yann LeCun \u63D0\u51FA\u7684\u7ECF\u5178\u5377\u79EF\u7F51\u7EDC\uFF0C\u624B\u5199\u6570\u5B57\u8BC6\u522B\u9F3B\u7956",
    paper: "Gradient-Based Learning Applied to Document Recognition",
    compatibleDatasets: ["mnist", "cifar10"],
    layers: [
      // 模板以 MNIST（1×28×28）为默认输入，此时 Flatten 输出恰为 256，与下方 Linear 一致；
      // 选择 CIFAR-10 等其他数据集时由 adaptLayersToInputShape 自动修正全部依赖参数
      { type: "Input", params: { inChannels: 1, inputHeight: 28, inputWidth: 28 } },
      { type: "Conv2D", params: { inChannels: 1, outChannels: 6, kernelSize: 5, padding: 0 } },
      { type: "AvgPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      { type: "Conv2D", params: { inChannels: 6, outChannels: 16, kernelSize: 5, padding: 0 } },
      { type: "AvgPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      { type: "Flatten" },
      { type: "Linear", params: { inFeatures: 256, outFeatures: 120 } },
      { type: "Tanh" },
      { type: "Linear", params: { inFeatures: 120, outFeatures: 84 } },
      { type: "Tanh" },
      { type: "Linear", params: { inFeatures: 84, outFeatures: 10 } }
    ]
  },
  {
    id: "alexnet",
    name: "AlexNet",
    year: 2012,
    description: "ImageNet \u7A81\u7834\u4E4B\u4F5C\uFF0C\u5F00\u542F\u6DF1\u5EA6\u5B66\u4E60\u65F6\u4EE3",
    paper: "ImageNet Classification with Deep Convolutional Neural Networks",
    compatibleDatasets: [],
    layers: [
      { type: "Input", params: { inChannels: 3, inputHeight: 224, inputWidth: 224 } },
      { type: "Conv2D", params: { inChannels: 3, outChannels: 64, kernelSize: 11, stride: 4, padding: 2 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 3, poolStride: 2 } },
      { type: "Conv2D", params: { inChannels: 64, outChannels: 192, kernelSize: 5, padding: 2 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 3, poolStride: 2 } },
      { type: "Conv2D", params: { inChannels: 192, outChannels: 384, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 384, outChannels: 256, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 256, outChannels: 256, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 3, poolStride: 2 } },
      { type: "Flatten" },
      { type: "Linear", params: { inFeatures: 9216, outFeatures: 4096 } },
      { type: "ReLU" },
      { type: "Dropout", params: { dropRate: 0.5 } },
      { type: "Linear", params: { inFeatures: 4096, outFeatures: 4096 } },
      { type: "ReLU" },
      { type: "Dropout", params: { dropRate: 0.5 } },
      { type: "Linear", params: { inFeatures: 4096, outFeatures: 1e3 } }
    ]
  },
  {
    id: "vgg16",
    name: "VGG-16",
    year: 2014,
    description: "VGG \u7EC4\u63D0\u51FA\u7684 16 \u5C42\u7F51\u7EDC\uFF0C\u7ED3\u6784\u7B80\u6D01\u7EDF\u4E00",
    paper: "Very Deep Convolutional Networks for Large-Scale Image Recognition",
    compatibleDatasets: [],
    layers: [
      { type: "Input", params: { inChannels: 3, inputHeight: 224, inputWidth: 224 } },
      // Block 1
      { type: "Conv2D", params: { inChannels: 3, outChannels: 64, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 64, outChannels: 64, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      // Block 2
      { type: "Conv2D", params: { inChannels: 64, outChannels: 128, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 128, outChannels: 128, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      // Block 3
      { type: "Conv2D", params: { inChannels: 128, outChannels: 256, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 256, outChannels: 256, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 256, outChannels: 256, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      // Block 4
      { type: "Conv2D", params: { inChannels: 256, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 512, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 512, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      // Block 5
      { type: "Conv2D", params: { inChannels: 512, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 512, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 512, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      // FC
      { type: "Flatten" },
      { type: "Linear", params: { inFeatures: 25088, outFeatures: 4096 } },
      { type: "ReLU" },
      { type: "Dropout", params: { dropRate: 0.5 } },
      { type: "Linear", params: { inFeatures: 4096, outFeatures: 4096 } },
      { type: "ReLU" },
      { type: "Dropout", params: { dropRate: 0.5 } },
      { type: "Linear", params: { inFeatures: 4096, outFeatures: 1e3 } }
    ]
  },
  {
    id: "resnet18",
    name: "ResNet-18",
    year: 2015,
    description: "\u4F55\u607A\u660E\u63D0\u51FA\u7684\u6B8B\u5DEE\u7F51\u7EDC\uFF0C\u89E3\u51B3\u6DF1\u5C42\u7F51\u7EDC\u9000\u5316\u95EE\u9898\uFF08\u7B80\u5316\u7248\uFF0C\u65E0\u8DF3\u8DC3\u8FDE\u63A5\uFF09",
    paper: "Deep Residual Learning for Image Recognition",
    compatibleDatasets: [],
    layers: [
      { type: "Input", params: { inChannels: 3, inputHeight: 224, inputWidth: 224 } },
      { type: "Conv2D", params: { inChannels: 3, outChannels: 64, kernelSize: 7, stride: 2, padding: 3 } },
      { type: "BatchNorm2d", params: { numFeatures: 64 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 3, poolStride: 2, padding: 1 } },
      // Layer1
      { type: "Conv2D", params: { inChannels: 64, outChannels: 64, kernelSize: 3, padding: 1 } },
      { type: "BatchNorm2d", params: { numFeatures: 64 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 64, outChannels: 64, kernelSize: 3, padding: 1 } },
      { type: "BatchNorm2d", params: { numFeatures: 64 } },
      { type: "ReLU" },
      // Layer2
      { type: "Conv2D", params: { inChannels: 64, outChannels: 128, kernelSize: 3, stride: 2, padding: 1 } },
      { type: "BatchNorm2d", params: { numFeatures: 128 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 128, outChannels: 128, kernelSize: 3, padding: 1 } },
      { type: "BatchNorm2d", params: { numFeatures: 128 } },
      { type: "ReLU" },
      // Layer3
      { type: "Conv2D", params: { inChannels: 128, outChannels: 256, kernelSize: 3, stride: 2, padding: 1 } },
      { type: "BatchNorm2d", params: { numFeatures: 256 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 256, outChannels: 256, kernelSize: 3, padding: 1 } },
      { type: "BatchNorm2d", params: { numFeatures: 256 } },
      { type: "ReLU" },
      // Layer4
      { type: "Conv2D", params: { inChannels: 256, outChannels: 512, kernelSize: 3, stride: 2, padding: 1 } },
      { type: "BatchNorm2d", params: { numFeatures: 512 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 512, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "BatchNorm2d", params: { numFeatures: 512 } },
      { type: "ReLU" },
      // FC
      { type: "Flatten" },
      { type: "Linear", params: { inFeatures: 512, outFeatures: 1e3 } }
    ]
  },
  {
    id: "simplecnn",
    name: "SimpleCNN",
    year: 2020,
    description: "\u6559\u5B66\u7528\u7B80\u5355 CNN\uFF0C\u9002\u5408 MNIST/Fashion-MNIST \u5165\u95E8",
    paper: "",
    compatibleDatasets: ["mnist", "cifar10"],
    layers: [
      { type: "Input", params: { inChannels: 1, inputHeight: 28, inputWidth: 28 } },
      { type: "Conv2D", params: { inChannels: 1, outChannels: 32, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      { type: "Conv2D", params: { inChannels: 32, outChannels: 64, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      { type: "Flatten" },
      { type: "Linear", params: { inFeatures: 3136, outFeatures: 128 } },
      { type: "ReLU" },
      { type: "Dropout", params: { dropRate: 0.5 } },
      { type: "Linear", params: { inFeatures: 128, outFeatures: 10 } }
    ]
  },
  {
    id: "mlp",
    name: "MLP",
    year: 2020,
    description: "\u591A\u5C42\u611F\u77E5\u673A\uFF0C\u6700\u57FA\u7840\u7684\u5168\u8FDE\u63A5\u7F51\u7EDC",
    paper: "",
    compatibleDatasets: ["mnist"],
    layers: [
      { type: "Input", params: { inChannels: 1, inputHeight: 28, inputWidth: 28 } },
      { type: "Flatten" },
      { type: "Linear", params: { inFeatures: 784, outFeatures: 256 } },
      { type: "ReLU" },
      { type: "Dropout", params: { dropRate: 0.2 } },
      { type: "Linear", params: { inFeatures: 256, outFeatures: 128 } },
      { type: "ReLU" },
      { type: "Dropout", params: { dropRate: 0.2 } },
      { type: "Linear", params: { inFeatures: 128, outFeatures: 10 } }
    ]
  },
  {
    id: "googlenet",
    name: "GoogLeNet",
    year: 2014,
    description: "Google \u63D0\u51FA\u7684 Inception \u7F51\u7EDC\uFF0CILSVRC 2014 \u51A0\u519B\uFF08\u7B80\u5316\u7248\uFF09",
    paper: "Going Deeper with Convolutions",
    compatibleDatasets: [],
    layers: [
      { type: "Input", params: { inChannels: 3, inputHeight: 224, inputWidth: 224 } },
      { type: "Conv2D", params: { inChannels: 3, outChannels: 64, kernelSize: 7, stride: 2, padding: 3 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 3, poolStride: 2 } },
      { type: "Conv2D", params: { inChannels: 64, outChannels: 64, kernelSize: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 64, outChannels: 192, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 3, poolStride: 2 } },
      // Simplified Inception-like blocks
      { type: "Conv2D", params: { inChannels: 192, outChannels: 256, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 256, outChannels: 480, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      { type: "Conv2D", params: { inChannels: 480, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 512, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      { type: "Flatten" },
      { type: "Linear", params: { inFeatures: 8192, outFeatures: 1024 } },
      { type: "ReLU" },
      { type: "Dropout", params: { dropRate: 0.4 } },
      { type: "Linear", params: { inFeatures: 1024, outFeatures: 1e3 } }
    ]
  },
  {
    id: "unet",
    name: "U-Net (\u7F16\u7801\u5668)",
    year: 2015,
    description: "\u533B\u5B66\u56FE\u50CF\u5206\u5272\u7ECF\u5178\u7F51\u7EDC\uFF08\u7F16\u7801\u5668\u90E8\u5206\uFF0C\u65E0\u8DF3\u8DC3\u8FDE\u63A5\uFF09",
    paper: "U-Net: Convolutional Networks for Biomedical Image Segmentation",
    compatibleDatasets: [],
    layers: [
      { type: "Input", params: { inChannels: 1, inputHeight: 256, inputWidth: 256 } },
      // Encoder path
      { type: "Conv2D", params: { inChannels: 1, outChannels: 64, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 64, outChannels: 64, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      { type: "Conv2D", params: { inChannels: 64, outChannels: 128, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 128, outChannels: 128, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      { type: "Conv2D", params: { inChannels: 128, outChannels: 256, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 256, outChannels: 256, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      { type: "Conv2D", params: { inChannels: 256, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 512, outChannels: 512, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "MaxPool2D", params: { poolKernelSize: 2, poolStride: 2 } },
      // Bottleneck
      { type: "Conv2D", params: { inChannels: 512, outChannels: 1024, kernelSize: 3, padding: 1 } },
      { type: "ReLU" },
      { type: "Conv2D", params: { inChannels: 1024, outChannels: 1024, kernelSize: 3, padding: 1 } },
      { type: "ReLU" }
    ]
  }
];

// src/utils/shapeInference.ts
function inferOutputShape(type, params, inputShape) {
  if (!inputShape || inputShape.length === 0) {
    return null;
  }
  switch (type) {
    case "Conv2D": {
      const inChannels = inputShape[0];
      if (inChannels === null || inChannels === void 0) return null;
      const outChannels = params.outChannels ?? params.filters;
      if (outChannels === void 0 || outChannels === null) return null;
      const kernelSize = params.kernelSize ?? 3;
      const stride = params.stride ?? 1;
      const padding = params.padding ?? 0;
      const H = inputShape[1];
      const W = inputShape[2];
      if (H === null || H === void 0 || W === null || W === void 0) return null;
      const outH = Math.floor((H + 2 * padding - kernelSize) / stride) + 1;
      const outW = Math.floor((W + 2 * padding - kernelSize) / stride) + 1;
      if (outH <= 0 || outW <= 0) return null;
      return [outChannels, outH, outW];
    }
    case "MaxPool2D": {
      const C = inputShape[0];
      if (C === null || C === void 0) return null;
      const poolKernelSize = params.poolKernelSize ?? params.poolSize ?? 2;
      const poolStride = params.poolStride ?? poolKernelSize;
      const padding = params.padding ?? 0;
      const H = inputShape[1];
      const W = inputShape[2];
      if (H === null || H === void 0 || W === null || W === void 0) return null;
      const outH = Math.floor((H + 2 * padding - poolKernelSize) / poolStride) + 1;
      const outW = Math.floor((W + 2 * padding - poolKernelSize) / poolStride) + 1;
      if (outH <= 0 || outW <= 0) return null;
      return [C, outH, outW];
    }
    case "Linear": {
      if (inputShape.length > 1) {
        return null;
      }
      const outFeatures = params.outFeatures ?? params.units ?? params.outputSize;
      if (outFeatures === void 0 || outFeatures === null) return null;
      return [outFeatures];
    }
    case "ReLU":
    case "Sigmoid":
    case "Tanh":
    case "BatchNorm2d":
    case "Dropout": {
      return inputShape;
    }
    case "LayerNorm": {
      return inputShape;
    }
    case "AvgPool2D": {
      const C = inputShape[0];
      if (C === null || C === void 0) return null;
      const poolKernelSize = params.poolKernelSize ?? params.poolSize ?? 2;
      const poolStride = params.poolStride ?? poolKernelSize;
      const padding = params.padding ?? 0;
      const H = inputShape[1];
      const W = inputShape[2];
      if (H === null || H === void 0 || W === null || W === void 0) return null;
      const outH = Math.floor((H + 2 * padding - poolKernelSize) / poolStride) + 1;
      const outW = Math.floor((W + 2 * padding - poolKernelSize) / poolStride) + 1;
      if (outH <= 0 || outW <= 0) return null;
      return [C, outH, outW];
    }
    case "Input": {
      if (params.inChannels != null && params.inputHeight != null && params.inputWidth != null) {
        return [params.inChannels, params.inputHeight, params.inputWidth];
      }
      if (params.inChannels != null && inputShape && inputShape.length >= 3) {
        return [params.inChannels, inputShape[1], inputShape[2]];
      }
      return inputShape;
    }
    case "Flatten": {
      let product = 1;
      for (const dim of inputShape) {
        if (dim === null || dim === void 0) return null;
        product *= dim;
      }
      return [product];
    }
    default: {
      console.warn(`Unknown layer type: ${type}`);
      return null;
    }
  }
}
function adaptLayersToInputShape(layers, inputShape) {
  const adapted = layers.map((layer) => ({ ...layer, params: { ...layer.params ?? {} } }));
  let currentShape = [inputShape[0], inputShape[1], inputShape[2]];
  for (const layer of adapted) {
    if (layer.type === "Input") {
      layer.params.inChannels = inputShape[0];
      layer.params.inputHeight = inputShape[1];
      layer.params.inputWidth = inputShape[2];
      currentShape = [inputShape[0], inputShape[1], inputShape[2]];
      continue;
    }
    if (!currentShape) break;
    if (layer.type === "Conv2D" && currentShape.length === 3) {
      layer.params.inChannels = currentShape[0];
    } else if (layer.type === "Linear" && currentShape.length === 1) {
      layer.params.inFeatures = currentShape[0];
    }
    currentShape = inferOutputShape(layer.type, layer.params, currentShape);
  }
  return adapted;
}
export {
  CLASSIC_MODELS,
  adaptLayersToInputShape
};
