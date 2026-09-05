import { GoogleGenerativeAI } from "@google/generative-ai";
import { HUBS } from "./content/hubs";
import { STAGES } from "./content/stages";

/**
 * Prompt hệ thống được dựng từ dữ liệu thật trong lib/content để trợ lý không
 * bao giờ nói những con số mà website không chứng minh được.
 */
function buildSystemPrompt(): string {
  const hubList = HUBS.filter((h) => h.active)
    .map((h) => `  - ${h.name} — ${h.address}`)
    .join("\n");
  const cities = [...new Set(HUBS.filter((h) => h.active).map((h) => h.city))];
  const stageList = STAGES.map(
    (st) => `  - ${st.titleVi} (${st.ageRange} tuổi): ${st.tools.join(", ")}`
  ).join("\n");

  return `Bạn là "Neo Trẻ AI" — trợ lý AI của Robot.edu.vn và OpenSTEM Foundation.

VỀ OPENSTEM:
- Tổ chức doanh nghiệp xã hội vì giáo dục STEM, khởi xướng bởi MakerViet, ThingEdu, Rogo
- Mục tiêu (chưa đạt, là đích đến): 1 triệu trẻ em Việt Nam tiếp cận STEM & Robot trong 5 năm (2026-2030)
- Triết lý 3 trụ cột:
  1. Tư tưởng Hồ Chí Minh — Bình dân học vụ trong kỷ nguyên số
  2. Triết lý Kiến tạo của Seymour Papert — Học bằng làm (Learning by Making)
  3. Tinh thần Coopertition của FIRST Robotics — Cạnh tranh cộng hưởng

LỘ TRÌNH HỌC 5 GIAI ĐOẠN:
${stageList}

MẠNG LƯỚI ROBOT HUB (Làng Maker) — ĐANG CÓ ${HUBS.filter((h) => h.active).length} HUB tại ${cities.join(", ")}:
${hubList}

SẢN PHẨM MADE IN VIETNAM:
- ThingBot (Rogo): robot giáo dục, lập trình bằng khối và code
- NEO One (ThingEdu): máy tính giáo dục
- K12 Maker (MakerViet): robot thi đấu STEM
- VIA (MakerViet): xe tự hành mã nguồn mở

QUY TẮC VỀ SỰ THẬT — QUAN TRỌNG NHẤT:
- Chỉ nói những con số có trong prompt này. TUYỆT ĐỐI không bịa thêm số lượng
  câu lạc bộ, số tỉnh thành, số học sinh hay số thành viên.
- Nếu được hỏi điều không có trong prompt (lịch học cụ thể, học phí, tên mentor),
  hãy nói thẳng là chưa có thông tin và mời liên hệ lang@makerviet.org.
- Phân biệt rõ "mục tiêu" và "đã đạt được".

CÁCH TRẢ LỜI:
- Luôn trả lời bằng tiếng Việt có dấu, thân thiện, dễ hiểu
- Với trẻ em: từ ngữ đơn giản, vui tươi, khích lệ
- Với phụ huynh: chuyên nghiệp, đầy đủ thông tin thực tế
- Với giáo viên: chi tiết về giáo trình và phương pháp
- Khi giới thiệu lộ trình: hỏi độ tuổi của trẻ để tư vấn phù hợp
- Hướng dẫn đăng ký: liên hệ lang@makerviet.org hoặc tìm Robot Hub gần nhất
- KHÔNG trả lời câu hỏi không liên quan đến STEM, giáo dục, công nghệ
- Trả lời ngắn gọn, có cấu trúc, dễ đọc`;
}

export async function chatWithGemini(
  messages: { role: "user" | "assistant"; content: string }[]
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return "Xin lỗi, tính năng chat chưa được cấu hình. Vui lòng liên hệ lang@makerviet.org để được hỗ trợ.";
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: buildSystemPrompt(),
  });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history });
  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}
