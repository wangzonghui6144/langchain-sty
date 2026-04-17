import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import * as dotenv from "dotenv";

// 加载环境变量
dotenv.config();

// 检查 API key 是否配置
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ 错误: 请先在 .env 文件中配置 OPENAI_API_KEY");
  console.log("💡 提示: 复制 .env.example 为 .env 并填入你的 API key");
  process.exit(1);
}

// 创建 OpenAI 聊天模型
const model = new ChatOpenAI({
  modelName: "LongCat-Flash-Chat",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: process.env.OPENAI_API_BASE,
  },
});

// 创建提示模板
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful AI assistant."],
  ["human", "{input}"],
]);

// 创建输出解析器
const outputParser = new StringOutputParser();

// 创建处理链
const chain = prompt.pipe(model).pipe(outputParser);

// 运行示例
async function runExamples() {
  console.log("🤖 LangChain 示例运行中...\n");

  try {
    // 示例 1: 基本对话
    console.log("📝 示例 1: 基本对话");
    const result1 = await chain.invoke({
      input: "你好！请介绍一下自己。"
    });
    console.log("AI 回复:", result1);
    console.log();

    // 示例 2: 翻译任务
    console.log("📝 示例 2: 翻译任务");
    const result2 = await chain.invoke({
      input: "请将以下英文翻译成中文: 'Hello, how are you today?'"
    });
    console.log("AI 回复:", result2);
    console.log();

    // 示例 3: 编程帮助
    console.log("📝 示例 3: 编程帮助");
    const result3 = await chain.invoke({
      input: "请解释一下什么是 TypeScript，并给出一个简单的示例。"
    });
    console.log("AI 回复:", result3);

  } catch (error) {
    console.error("❌ 运行出错:", error);
    console.log("\n💡 可能的原因:");
    console.log("- API key 配置错误");
    console.log("- 网络连接问题");
    console.log("- API 服务暂时不可用");
  }
}

// 运行示例
runExamples();