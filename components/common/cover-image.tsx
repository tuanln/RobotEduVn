import Image from "next/image";

/**
 * Ảnh bìa bài viết. Khi bài chưa có ảnh thật, vẽ nền gradient kèm chữ cái đầu
 * thay vì trỏ tới file placeholder không tồn tại (gây ảnh vỡ).
 */
export function CoverImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  if (!src) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-emerald-400/15 to-amber-400/20"
        aria-hidden
      >
        <span className="text-3xl font-extrabold text-primary/60">
          {alt.trim().charAt(0).toUpperCase() || "R"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes={sizes}
      unoptimized
    />
  );
}
