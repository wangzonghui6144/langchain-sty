// LangChainJS 学习项目 - 入口文件
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";

// 加载环境变量
dotenv.config();

// 基础示例
async function basicExample() {
  console.log("🚀 LangChainJS 学习开始...");

  // 检查环境变量
  console.log("🔧 API Key:", process.env.OPENAI_API_KEY ? "已设置" : "未设置");
  console.log("🔧 API Base:", process.env.OPENAI_API_BASE || "使用默认值");

  // 配置 LLM 模型
  const model = new ChatOpenAI({
    temperature: 0.7,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
    modelName: "LongCat-Flash-Chat",
  });

  const prompt = PromptTemplate.fromTemplate("请用中文回答：{question}");
  const parser = new StringOutputParser();

  const chain = prompt.pipe(model).pipe(parser);

  try {
    console.log("⏳ 正在调用 AI 模型...");
    const response = await chain.invoke({
      question: "什么是 LangChain？"
    }, {
      timeout: 30000, // 30秒超时
    });
    console.log("🤖 AI 回答:", response);
    console.log("✅ 调用成功！");
  } catch (error) {
    console.error("❌ 调用失败:", error.message);

    if (error.message.includes("400")) {
      console.log("💡 可能是模型名称或 API 配置问题");
      console.log("   建议：尝试使用其他模型或检查 API 端点");
    } else if (error.message.includes("timeout")) {
      console.log("💡 请求超时，可能是网络问题");
      console.log("   建议：检查网络连接或增加超时时间");
    } else if (error.message.includes("API key")) {
      console.log("💡 API Key 可能无效或未设置");
      console.log("   建议：检查 .env 文件中的 OPENAI_API_KEY");
    } else {
      console.log("💡 这是一个基础示例，展示了 LangChain 的核心概念：");
      console.log("   - PromptTemplate: 提示模板");
      console.log("   - ChatOpenAI: LLM 模型");
      console.log("   - StringOutputParser: 输出解析器");
      console.log("   - Chain: 链式调用");
    }

    console.log("\n🔄 建议运行离线演示：npm run demo");
  }
}

// 运行示例
async function main() {
  await basicExample();
  console.log("✅ 程序执行完成");
}

main().catch(console.error);

export { basicExample };