// LangChainJS 基础示例
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";

// 加载环境变量
dotenv.config();

async function helloLangChain() {
  console.log("👋 Hello LangChain!");

  // 1. 创建 LLM
  const llm = new ChatOpenAI({
    modelName: "LongCat-Flash-Chat",
    temperature: 0.7
  });

  // 2. 创建提示模板
  const prompt = PromptTemplate.fromTemplate(
    "你是一个有帮助的助手。请用中文回答：{question}"
  );

  // 3. 创建输出解析器
  const outputParser = new StringOutputParser();

  // 4. 创建链
  const chain = prompt.pipe(llm).pipe(outputParser);

  // 5. 运行链
  try {
    const result = await chain.invoke({
      question: "什么是 LangChain？"
    });

    console.log("📝 回答:", result);
    return result;
  } catch (error) {
    console.error("❌ 错误:", error.message);
    console.log("💡 提示: 请确保已设置 OPENAI_API_KEY 环境变量");
  }
}

// 运行示例
helloLangChain();

export { helloLangChain };