// API 连接测试
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  console.log("🔗 开始 API 连接测试...");

  try {
    const model = new ChatOpenAI({
      // 不指定具体模型，使用默认模型
      temperature: 0.7,
      apiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: process.env.OPENAI_API_BASE,
      },
      timeout: 10000, // 10秒超时
    });

    console.log("⏳ 正在连接 API...");

    // 简单的测试调用
    const response = await model.invoke("你好，请说一句话测试");

    console.log("✅ API 连接成功！");
    console.log("📝 响应:", response.content);

  } catch (error) {
    console.error("❌ API 连接失败:", error.message);
    console.log("💡 可能的原因：");
    console.log("   - 网络连接问题");
    console.log("   - API Key 无效");
    console.log("   - API 端点不可达");
    console.log("   - 请求超时");
  }
}

testConnection();