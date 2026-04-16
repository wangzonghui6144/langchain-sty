// LangChain 离线演示 - 展示核心概念
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";

dotenv.config();

async function offlineDemo() {
  console.log("🎯 LangChain 离线演示开始...");

  // 1. 演示 PromptTemplate
  console.log("\n📝 1. PromptTemplate 演示");
  const prompt = PromptTemplate.fromTemplate(
    "你是一个{role}，请用{style}的风格回答：{question}"
  );

  const formattedPrompt = await prompt.format({
    role: "专业老师",
    style: "简单易懂",
    question: "什么是 LangChain？"
  });
  console.log("格式化后的提示:", formattedPrompt);

  // 2. 演示 StringOutputParser
  console.log("\n🔧 2. StringOutputParser 演示");
  const parser = new StringOutputParser();
  console.log("✅ StringOutputParser 创建成功");

  // 3. 演示 Chain 构建
  console.log("\n⛓️  3. Chain 构建演示");
  const chain = RunnableSequence.from([
    prompt,
    // 这里通常会连接 LLM，但我们用模拟响应
    (input) => {
      console.log("模拟 LLM 输入:", input);
      return {
        content: "LangChain 是一个用于开发由语言模型驱动的应用程序的框架。它提供了模块化组件，可以轻松构建复杂的应用程序。"
      };
    },
    parser
  ]);

  console.log("✅ Chain 构建成功");

  // 4. 演示 Chain 执行
  console.log("\n🚀 4. Chain 执行演示");
  try {
    const result = await chain.invoke({
      role: "AI 助手",
      style: "友好",
      question: "什么是 LangChain？"
    });

    console.log("最终结果:", result);
  } catch (error) {
    console.error("❌ 执行失败:", error.message);
  }

  // 5. 演示多个链的组合
  console.log("\n🔗 5. 多链组合演示");

  const translationPrompt = PromptTemplate.fromTemplate(
    "将以下中文翻译成英文：{text}"
  );

  const translationChain = translationPrompt.pipe((input) => {
    console.log("翻译输入:", input);
    return {
      content: "LangChain is a framework for developing applications powered by language models."
    };
  }).pipe(parser);

  const translation = await translationChain.invoke({
    text: "LangChain 是一个用于开发由语言模型驱动的应用程序的框架。"
  });

  console.log("翻译结果:", translation);

  console.log("\n✅ 离线演示完成！");
  console.log("💡 这展示了 LangChain 的核心概念：");
  console.log("   - PromptTemplate: 动态生成提示");
  console.log("   - StringOutputParser: 解析输出");
  console.log("   - RunnableSequence: 构建处理链");
  console.log("   - Chain 组合: 多个链的协同工作");
}

offlineDemo().catch(console.error);