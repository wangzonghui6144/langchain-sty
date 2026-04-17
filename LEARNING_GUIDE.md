# LangChain TypeScript 学习指南

## 项目结构说明

```
langchain-sty/
├── src/                    # 主要源代码目录
│   ├── index.ts          # 项目入口文件（演示程序）
│   ├── hello-langchain.ts # LangChain 基础示例
│   └── ...               # 其他示例文件
├── examples/             # 额外示例目录
├── dist/                 # TypeScript 编译输出目录
├── node_modules/         # 依赖包
├── .env                  # 环境变量配置（需要自己创建）
├── .env.example          # 环境变量示例
├── package.json          # 项目配置和依赖
├── tsconfig.json         # TypeScript 配置
└── LEARNING_GUIDE.md     # 本文件
```

## 快速开始

### 1. 环境配置

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 然后编辑 .env 文件，填入你的 API key

# 编译 TypeScript
npm run build

# 运行基础示例
npm start

# 运行 LangChain 示例（需要配置 API key）
npm run hello-langchain
```

### 2. TypeScript 基础

本项目使用 TypeScript，相比 JavaScript 有以下优势：

- **类型安全**: 编译时检查类型错误
- **更好的 IDE 支持**: 智能提示和自动补全
- **代码可维护性**: 类型注解让代码更易理解

### 3. LangChain 核心概念

#### 3.1 LLM (大语言模型)

```typescript
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});
```

#### 3.2 Prompt Templates (提示模板)

```typescript
import { ChatPromptTemplate } from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  ["human", "Tell me about {topic}"],
]);
```

#### 3.3 Chains (链式处理)

```typescript
import { StringOutputParser } from "@langchain/core/output_parsers";

const chain = prompt.pipe(model).pipe(new StringOutputParser());
const result = await chain.invoke({ topic: "TypeScript" });
```

#### 3.4 Tools (工具)

```typescript
import { tool } from "langchain";
import * as z from "zod";

const getWeather = tool(
  (input: { city: string }) => `Weather in ${input.city}`,
  {
    name: "get_weather",
    description: "Get weather for a city",
    schema: z.object({
      city: z.string(),
    }),
  }
);
```

## 学习路径建议

### 第一阶段：基础概念

1. **运行示例**: 先运行 `npm start` 和 `npm run hello-langchain`
2. **理解结构**: 阅读 `src/index.ts` 和 `src/hello-langchain.ts`
3. **修改实验**: 尝试修改提示词和参数

### 第二阶段：核心组件

1. **Prompt Templates**: 学习创建不同的提示模板
2. **Output Parsers**: 了解如何解析模型输出
3. **Chains**: 掌握链式调用的组合方式

### 第三阶段：高级功能

1. **Tools**: 学习创建和使用工具
2. **Agents**: 了解智能体的概念
3. **Memory**: 学习对话记忆的实现
4. **Retrieval**: 了解文档检索功能

## 常用命令

```bash
# 开发模式（编译并运行）
npm start

# 编译 TypeScript
npm run build

# 运行 LangChain 示例
npm run hello-langchain

# 运行测试
npm test
```

## 学习资源

- [LangChain 官方文档](https://docs.langchain.com/oss/javascript/langchain/quickstart)
- [LangChain GitHub](https://github.com/langchain-ai/langchain-js)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)

## 常见问题

### Q: 如何配置 API key？

A: 复制 `.env.example` 为 `.env`，然后填入你的 OpenAI API key。

### Q: 编译出错怎么办？

A: 检查 TypeScript 语法错误，确保所有类型都正确定义。

### Q: 如何添加新的示例？

A: 在 `src/` 目录下创建新的 `.ts` 文件，然后运行 `npm run build` 编译。

## 下一步

1. 配置你的 API key
2. 运行 LangChain 示例
3. 修改示例代码进行实验
4. 创建你自己的 LangChain 应用

祝你学习愉快！ 🎉
