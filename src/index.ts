// 简单的 LangChain TypeScript 示例
// 这个示例展示了基本的 LangChain 概念

console.log("🎉 LangChain TypeScript 项目配置成功！");
console.log("\n📁 项目结构:");
console.log("- src/index.ts (主入口文件)");
console.log("- tsconfig.json (TypeScript 配置)");
console.log("- package.json (项目依赖和脚本)");
console.log("- .env (环境变量配置)");

console.log("\n🚀 可用命令:");
console.log("- npm start: 运行主示例");
console.log("- npm run build: 编译 TypeScript");
console.log("- npm test: 运行测试");

console.log("\n📚 LangChain 学习资源:");
console.log("- 官方文档: https://docs.langchain.com/oss/javascript/langchain/quickstart");
console.log("- GitHub: https://github.com/langchain-ai/langchain-js");

console.log("\n✨ 现在你可以开始学习 LangChain 了！");
console.log("尝试修改 src/index.ts 文件来创建你自己的 LangChain 应用。");

// 示例：基本的 LangChain 导入（这些在实际使用时需要相应的 API keys）
// import { ChatOpenAI } from "@langchain/openai";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";

// 示例：创建一个简单的提示模板
// const prompt = ChatPromptTemplate.fromMessages([
//   ["system", "You are a helpful assistant."],
//   ["human", "Tell me about {topic}"],
// ]);

// 示例：创建 LLM 实例（需要配置 API key）
// const model = new ChatOpenAI({
//   modelName: "gpt-3.5-turbo",
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// 示例：创建处理链
// const chain = prompt.pipe(model).pipe(new StringOutputParser());

// 示例：运行链
// const result = await chain.invoke({ topic: "LangChain" });
// console.log(result);