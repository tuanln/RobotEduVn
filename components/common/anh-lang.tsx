import Image from "next/image";
import { duongDanAnh } from "@/lib/content/anh-lang";

/**
 * Khung ảnh hoạt động của Làng. Chưa có tệp `public/hoc-lieu/lang/<mã>.webp`
 * thì không render gì — không ô trống, không ảnh vỡ. Server component.
 */
export function AnhLang({
  ma,
  alt,
  chuThich,
  className = "",
  width = 1200,
  height = 800,
  priority = false,
}: {
  ma: string;
  alt: string;
  chuThich?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const src = duongDanAnh(ma);
  if (src === null) return null;
  return (
    <figure className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 800px"
        className="h-auto w-full rounded-2xl border border-border"
      />
      {chuThich && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {chuThich}
        </figcaption>
      )}
    </figure>
  );
}
