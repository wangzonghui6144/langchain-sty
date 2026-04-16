// LangChainJS 学习项目 - 入口文件
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// 基础示例
async function basicExample() {
  console.log("🚀 LangChainJS 学习开始...");

  // 注意：需要设置 OPENAI_API_KEY 环境变量
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  const prompt = PromptTemplate.fromTemplate("请用中文回答：{question}");
  const parser = new StringOutputParser();

  const chain = prompt.pipe(model).pipe(parser);

  try {
    const response = await chain.invoke({
      question: "什么是 LangChain？"
    });
    console.log("🤖 AI 回答:", response);
  } catch (error) {
    console.log("⚠️ 请先设置 OPENAI_API_KEY 环境变量");
    console.log("💡 这是一个基础示例，展示了 LangChain 的核心概念：");
    console.log("   - PromptTemplate: 提示模板");
    console.log("   - ChatOpenAI: LLM 模型");
    console.log("   - StringOutputParser: 输出解析器");
    console.log("   - Chain: 链式调用");
  }
}

// 运行示例
basicExample();

export { basicExample };