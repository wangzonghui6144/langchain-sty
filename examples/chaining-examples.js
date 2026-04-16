// 链式调用示例
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";

dotenv.config();

async function chainingExamples() {
  console.log("⛓️  链式调用示例\n");

  // 1. 基础链
  console.log("1️⃣ 基础链");
  const prompt1 = PromptTemplate.fromTemplate("请用一句话解释：{topic}");
  const parser1 = new StringOutputParser();

  const simpleChain = prompt1.pipe((input) => {
    console.log("模拟 LLM 处理:", input.value);
    return { content: "这是一个关于" + input.value.split("：")[1] + "的简明解释。" };
  }).pipe(parser1);

  const result1 = await simpleChain.invoke({ topic: "人工智能" });
  console.log("结果:", result1);

  // 2. 多步链
  console.log("\n2️⃣ 多步链");
  const step1Prompt = PromptTemplate.fromTemplate("分析这个主题的关键点：{topic}");
  const step2Prompt = PromptTemplate.fromTemplate("基于这些关键点：{analysis}，生成一个总结");

  const multiStepChain = RunnableSequence.from([
    step1Prompt,
    (input) => {
      console.log("步骤1 - 分析输入:", input.value);
      return { content: "关键点1：定义；关键点2：应用；关键点3：影响" };
    },
    parser1,
    { analysis: (input) => input },
    step2Prompt,
    (input) => {
      console.log("步骤2 - 总结输入:", input.value);
      return { content: "这是一个综合性的总结，涵盖了定义、应用和影响三个方面。" };
    },
    parser1
  ]);

  const result2 = await multiStepChain.invoke({ topic: "机器学习" });
  console.log("结果:", result2);

  // 3. 并行链
  console.log("\n3️⃣ 并行处理");
  const translatePrompt = PromptTemplate.fromTemplate("将'{text}'翻译成英文");
  const summarizePrompt = PromptTemplate.fromTemplate("用一句话总结：{text}");

  const translateChain = translatePrompt.pipe((input) => {
    return { content: "Translation: " + input.value.split("'")[1] + " in English" };
  }).pipe(parser1);

  const summarizeChain = summarizePrompt.pipe((input) => {
    return { content: "Summary: Key points about " + input.value.split("：")[1] };
  }).pipe(parser1);

  const text = "人工智能正在改变我们的世界";

  const [translation, summary] = await Promise.all([
    translateChain.invoke({ text }),
    summarizeChain.invoke({ text })
  ]);

  console.log("翻译:", translation);
  console.log("总结:", summary);

  console.log("\n✅ 链式调用示例完成！");
}

chainingExamples().catch(console.error);