/**
 * Tệp tải về của thư viện khóa học (54 MB PDF/Word) nằm trên Vercel Blob,
 * kho công khai `robot-edu-vn-hoc-lieu` (sin1), không nằm trong git.
 * Tải lên một lần bằng `vercel blob put --pathname khoa-hoc/<đường dẫn>`;
 * nội dung Markdown trỏ thẳng tới URL dưới đây.
 *
 * Danh sách phải khớp đúng các link trong content/khoa-hoc — test
 * noi-dung.test.ts chặn link trỏ tới tệp chưa tải lên.
 */
export const BLOB_KHOA_HOC =
  "https://lrywo2cvc6iz8mox.public.blob.vercel-storage.com/khoa-hoc";

/** Đường dẫn đã mã hoá URL, đúng như trong Markdown và trên Blob. */
export const TEP_BLOB = [
  "0941a7c0feac/banh-rang-.pdf",
  "1c6c83d976fc/dai-day-curoa-pulley.pdf",
  "2c95f3441544/INTAKE.pdf",
  "2df962bd6cab/team-vietnam_xich-nhong.pdf",
  "4b8822045438/shooter.pdf",
  "543dea1a46a4/team-vietnam_cac-loai-banh-xe-1.pdf",
  "5ca9971ab3eb/fgc_team_greece_eng_book_v3.2.pdf",
  "7cff718fd7a8/team-vietnam_truc-vong-bi-khop-1.pdf",
  "7f9dfe736906/L%E1%BB%8ACH-TRAINING-C%C3%81C-%C4%90%E1%BB%98I-THI-VIETNAM-ROBOTICS-CHALLENGE-2023.pdf",
  "9441fbebc230/team_vietnam_engineering_notebook__b%E1%BA%A3n_ti%E1%BA%BFng_vi%E1%BB%87t_.pdf",
  "95605dc846d5/FPTU-AI-ROBOTICS-CHALLENGE-2025-_-%C4%90%E1%BB%80-B%C3%80I-V%C3%80-LU%E1%BA%ACT-THI-%C4%90%E1%BA%A4U.docx.pdf",
  "ab6bec6ad760/engineering_notebook_fgc2022_r2045.pdf",
  "word/cobot.docx",
  "word/dai-su-robotics.docx",
  "word/k12-maker-2023.docx",
  "word/k12-maker-2024.docx",
  "word/k12-maker-2025.docx",
  "word/thingbot.docx",
  "word/vorc-2023.docx",
] as const;
