# langchain-sty

LangChainJS 学习项目

## 项目说明

这是一个用于学习 LangChainJS 框架的项目，提供了丰富的示例和演示来帮助您理解 LangChain 的核心概念。

## 项目结构

```
langchain-sty/
├── 📁 src/                    # 源代码目录
│   ├── index.js              # 主入口文件
│   ├── test-basic.js         # 基础组件测试
│   ├── test-connection.js    # API 连接测试
│   └── offline-demo.js       # 离线演示
├── 📁 examples/              # 示例代码
│   ├── hello-langchain.js    # 基础示例
│   ├── prompt-templates.js   # 提示模板示例
│   └── chaining-examples.js  # 链式调用示例
├── 📁 docs/                  # 文档目录
├── 📄 README.md              # 项目说明
├── 📄 package.json           # 项目配置
├── 📄 .env.example           # 环境变量示例
├── 📄 .env                   # 环境变量（需要您配置）
├── 📄 .gitignore             # Git 忽略文件
└── 📄 package-lock.json      # 依赖锁定文件
```

## 安装依赖

```bash
npm install
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量示例文件并填入您的 API 密钥：

```bash
cp .env.example .env
```

### 3. 运行示例

```bash
# 运行主程序
npm start

# 运行基础测试
npm test

# 运行离线演示
npm run demo

# 运行提示模板示例
npm run example
```

### 4. 基础代码示例

```javascript
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = PromptTemplate.fromTemplate("请用中文回答：{question}");
const parser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(parser);

const response = await chain.invoke({
  question: "什么是 LangChain？"
});

console.log(response);
```

## 学习内容

- 基础概念
- LLM 集成
- 提示工程
- 链式调用
- 内存管理
- 代理系统
 
## 参考资料

- [LangChainJS 官方文档](https://js.langchain.com/)
- [LangChainJS 中文教程](https://js.langchaincn.com/docs/)
- [LangChain 教程](https://python.langchain.com/docs/get_started/quickstart)
