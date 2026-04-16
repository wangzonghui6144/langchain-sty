// 健壮的 LangChain 演示 - 带重试和回退机制
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";

dotenv.config();

class RobustLangChainDemo {
  constructor() {
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1秒
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async createModelWithFallback() {
    // 尝试不同的模型配置
    const configs = [
      {
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        apiKey: process.env.OPENAI_API_KEY,
        configuration: { baseURL: process.env.OPENAI_API_BASE }
      },
      {
        temperature: 0.7,
        apiKey: process.env.OPENAI_API_KEY,
        configuration: { baseURL: process.env.OPENAI_API_BASE }
      },
      {
        model: "text-davinci-003",
        temperature: 0.7,
        apiKey: process.env.OPENAI_API_KEY,
        configuration: { baseURL: process.env.OPENAI_API_BASE }
      }
    ];

    for (let i = 0; i < configs.length; i++) {
      try {
        console.log(`🔄 尝试配置 ${i + 1}/${configs.length}...`);
        const model = new ChatOpenAI(configs[i]);

        // 测试模型连接
        await model.invoke("test");
        console.log(`✅ 配置 ${i + 1} 成功！`);
        return model;
      } catch (error) {
        console.log(`❌ 配置 ${i + 1} 失败: ${error.message}`);
        if (i < configs.length - 1) {
          await this.delay(this.retryDelay);
        }
      }
    }

    return null; // 所有配置都失败
  }

  async runWithRetry(operation, description) {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`⏳ ${description} (尝试 ${attempt}/${this.maxRetries})`);
        const result = await operation();
        console.log(`✅ ${description} 成功！`);
        return result;
      } catch (error) {
        console.log(`❌ 尝试 ${attempt} 失败: ${error.message}`);

        if (attempt < this.maxRetries) {
          console.log(`⏳ ${this.retryDelay}ms 后重试...`);
          await this.delay(this.retryDelay);
        }
      }
    }

    throw new Error(`${description} 在 ${this.maxRetries} 次尝试后仍然失败`);
  }

  async runDemo() {
    console.log("🚀 开始健壮的 LangChain 演示...\n");

    // 检查环境变量
    console.log("🔧 检查配置:");
    console.log("   API Key:", process.env.OPENAI_API_KEY ? "已设置" : "未设置");
    console.log("   API Base:", process.env.OPENAI_API_BASE || "使用默认值");
    console.log();

    // 创建提示和解析器
    const prompt = PromptTemplate.fromTemplate("请用中文简单回答：{question}");
    const parser = new StringOutputParser();

    // 尝试创建模型
    const model = await this.createModelWithFallback();

    if (!model) {
      console.log("\n⚠️  无法连接到 AI 模型，运行离线演示...");
      return this.runOfflineDemo(prompt, parser);
    }

    // 创建链
    const chain = prompt.pipe(model).pipe(parser);

    try {
      // 运行演示，带重试机制
      const response = await this.runWithRetry(
        () => chain.invoke({ question: "什么是 LangChain？" }),
        "调用 AI 模型"
      );

      console.log("\n🤖 AI 回答:", response);
      console.log("\n✅ 演示完成！LangChain 正常工作。");

    } catch (error) {
      console.log(`\n❌ 所有尝试都失败了: ${error.message}`);
      console.log("\n🔄 切换到离线演示...");
      await this.runOfflineDemo(prompt, parser);
    }
  }

  async runOfflineDemo(prompt, parser) {
    console.log("\n🎯 运行离线演示...");

    // 模拟 LLM 的链
    const offlineChain = prompt.pipe((input) => {
      console.log("📝 处理提示:", input.value);
      return {
        content: "LangChain 是一个强大的框架，用于构建由语言模型驱动的应用程序。它提供了模块化组件，让开发者可以轻松创建复杂的 AI 应用。"
      };
    }).pipe(parser);

    const response = await offlineChain.invoke({
      question: "什么是 LangChain？"
    });

    console.log("📚 离线回答:", response);
    console.log("\n✅ 离线演示完成！这展示了 LangChain 的核心概念：");
    console.log("   ✓ PromptTemplate: 动态生成提示");
    console.log("   ✓ 链式调用: 组合多个组件");
    console.log("   ✓ StringOutputParser: 解析输出");
  }
}

// 运行演示
const demo = new RobustLangChainDemo();
demo.runDemo().catch(console.error);