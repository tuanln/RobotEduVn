export interface TruCot {
  icon: string;
  title: string;
  quote: string;
  /** Các đoạn ngăn bằng dòng trống; trang tự tách thành thẻ <p>. */
  content: string;
}

export interface NguyenLy {
  title: string;
  desc: string;
}

export interface TrietLyContent {
  meta: { title: string; description: string };
  header: { title: string; subtitle: string };
  vongLap: { heading: string; intro: string };
  /** Ghép với số thứ tự: "Trụ cột 1: …" */
  truCotHeading: string;
  truCot: TruCot[];
  nguyenLyHeading: string;
  nguyenLy: NguyenLy[];
}
