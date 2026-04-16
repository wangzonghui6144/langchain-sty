// 基础测试 - 不依赖网络
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";

dotenv.config();

async function basicTest() {
  console.log("🧪 开始基础测试...");

  // 1. 测试 PromptTemplate
  console.log("1️⃣ 测试 PromptTemplate...");
  const prompt = PromptTemplate.fromTemplate("请用中文回答：{question}");
  const formattedPrompt = await prompt.format({
    question: "什么是 LangChain？"
  });
  console.log("📝 格式化后的提示:", formattedPrompt);

  // 2. 测试 StringOutputParser
  console.log("2️⃣ 测试 StringOutputParser...");
  const parser = new StringOutputParser();
  console.log("✅ StringOutputParser 创建成功");

  // 3. 测试环境变量
  console.log("3️⃣ 检查配置...");
  console.log("🔧 API Key:", process.env.OPENAI_API_KEY ? "已设置" : "未设置");
  console.log("🔧 API Base:", process.env.OPENAI_API_BASE || "使用默认值");

  console.log("✅ 基础测试完成！所有组件都正常工作。");
  console.log("💡 接下来您可以尝试运行完整的 LangChain 示例。");
}

basicTest().catch(console.error);