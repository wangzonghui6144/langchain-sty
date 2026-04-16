// 提示模板示例
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

async function promptTemplateExamples() {
  console.log("📝 提示模板示例\n");

  // 1. 基础模板
  console.log("1️⃣ 基础模板");
  const basicTemplate = PromptTemplate.fromTemplate("请回答：{question}");
  const basicResult = await basicTemplate.format({ question: "什么是人工智能？" });
  console.log("结果:", basicResult);

  // 2. 多变量模板
  console.log("\n2️⃣ 多变量模板");
  const multiVarTemplate = PromptTemplate.fromTemplate(
    "你是一个{role}，请用{style}的风格向{audience}解释：{topic}"
  );
  const multiVarResult = await multiVarTemplate.format({
    role: "老师",
    style: "生动有趣",
    audience: "小学生",
    topic: "太阳系"
  });
  console.log("结果:", multiVarResult);

  // 3. 复杂模板
  console.log("\n3️⃣ 复杂模板");
  const complexTemplate = PromptTemplate.fromTemplate(`
请根据以下信息生成一个故事：
- 主角：{character}
- 场景：{setting}
- 主题：{theme}
- 风格：{style}

请用{style}的风格写一个关于{character}在{setting}中的{theme}故事。
  `.trim());

  const complexResult = await complexTemplate.format({
    character: "勇敢的小猫",
    setting: "神秘的森林",
    theme: "友谊与冒险",
    style: "童话"
  });
  console.log("结果:", complexResult);

  console.log("\n✅ 提示模板示例完成！");
}

promptTemplateExamples().catch(console.error);