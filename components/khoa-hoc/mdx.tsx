import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

/**
 * Kiểu chữ cho bài học Markdown. Site không dùng @tailwindcss/typography nên
 * tự định kiểu từng thẻ, theo màu và bo góc của shadcn để hợp theme sáng/tối.
 */
function A({ href = "", className, ...props }: ComponentProps<"a">) {
  const cls = cn("font-medium text-primary underline underline-offset-4 hover:opacity-80", className);
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={cls} {...props} />;
  }
  return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props} />;
}

type AnhTinh = { src: string; width: number; height: number; blurDataURL?: string };

/**
 * remark-image của fumadocs-mdx đổi ảnh trong public/ thành import tĩnh, nên
 * `src` tới đây là OBJECT {src, width, height} chứ không phải chuỗi — coi nó
 * như chuỗi là mất src, ảnh trắng. Ảnh ngoài (via.makerviet.org…) giữ src
 * chuỗi kèm kích thước đọc lúc build; không qua next/image vì chưa khai
 * remotePatterns (/_next/image trả 400).
 */
function Img({ src, alt = "", width, height, className }: Omit<ComponentProps<"img">, "src"> & { src?: string | AnhTinh }) {
  const cls = cn("my-6 h-auto max-w-full rounded-lg border border-border", className);
  if (src && typeof src === "object") {
    return <Image src={src} alt={alt} sizes="(min-width: 1024px) 720px, 100vw" className={cls} />;
  }
  if (typeof src === "string" && src.startsWith("/") && width && height) {
    return (
      <Image src={src} alt={alt} width={Number(width)} height={Number(height)} sizes="(min-width: 1024px) 720px, 100vw" className={cls} />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={width} height={height} loading="lazy" className={cls} />;
}

export const mdxKhoaHoc: MDXComponents = {
  h1: (p) => <h2 className="mt-10 scroll-mt-24 text-2xl font-bold" {...p} />,
  h2: (p) => <h2 className="mt-10 scroll-mt-24 border-b border-border pb-2 text-2xl font-bold" {...p} />,
  h3: (p) => <h3 className="mt-8 scroll-mt-24 text-xl font-bold" {...p} />,
  h4: (p) => <h4 className="mt-6 scroll-mt-24 text-lg font-semibold" {...p} />,
  h5: (p) => <h5 className="mt-6 scroll-mt-24 font-semibold" {...p} />,
  h6: (p) => <h6 className="mt-6 scroll-mt-24 font-semibold" {...p} />,
  p: (p) => <p className="mt-4 leading-7" {...p} />,
  a: A,
  img: Img as MDXComponents["img"],
  ul: (p) => <ul className="mt-4 list-disc space-y-2 pl-6 leading-7" {...p} />,
  ol: (p) => <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7" {...p} />,
  blockquote: (p) => <blockquote className="mt-6 border-l-4 border-primary/40 pl-4 italic text-muted-foreground" {...p} />,
  hr: (p) => <hr className="my-8 border-border" {...p} />,
  table: (p) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...p} />
    </div>
  ),
  th: (p) => <th className="border border-border bg-muted px-3 py-2 text-left font-semibold" {...p} />,
  td: (p) => <td className="border border-border px-3 py-2 align-top" {...p} />,
  pre: (p) => <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm [&_code]:bg-transparent [&_code]:p-0" {...p} />,
  code: (p) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]" {...p} />,
};
