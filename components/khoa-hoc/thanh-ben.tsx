"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ListTree } from "lucide-react";
import type { Folder, Node, Root } from "fumadocs-core/page-tree";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { publicPath } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";

/**
 * Cây mục lục thư viện khóa học. So khớp trang đang mở bằng publicPath():
 * lúc prerender usePathname() trả đường dẫn nội bộ /vi/khoa-hoc/…, ở trình
 * duyệt trả /khoa-hoc/… — không quy về một mối là lệch hydrate.
 */
function chuaTrang(node: Node, url: string): boolean {
  if (node.type === "page") return node.url === url;
  if (node.type === "folder") {
    return node.index?.url === url || node.children.some((c) => chuaTrang(c, url));
  }
  return false;
}

function MucTrang({ url, ten, dangMo, onChon }: { url: string; ten: React.ReactNode; dangMo: boolean; onChon?: () => void }) {
  return (
    <Link
      href={url}
      onClick={onChon}
      aria-current={dangMo ? "page" : undefined}
      className={cn(
        "block rounded-md px-3 py-1.5 text-sm transition-colors",
        dangMo
          ? "bg-primary/10 font-semibold text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {ten}
    </Link>
  );
}

function CayCon({ nodes, url, onChon }: { nodes: Node[]; url: string; onChon?: () => void }) {
  return (
    <ul className="space-y-0.5">
      {nodes.map((node, i) => (
        <li key={node.$id ?? i}>
          <Nhanh node={node} url={url} onChon={onChon} />
        </li>
      ))}
    </ul>
  );
}

function Nhanh({ node, url, onChon }: { node: Node; url: string; onChon?: () => void }) {
  if (node.type === "page") {
    return <MucTrang url={node.url} ten={node.name} dangMo={node.url === url} onChon={onChon} />;
  }
  if (node.type === "separator") {
    return (
      <p className="mt-4 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {node.name}
      </p>
    );
  }
  return <ThuMuc folder={node} url={url} onChon={onChon} />;
}

/**
 * Trang tổng quan của thư mục. meta.json liệt kê "index" tường minh nên
 * fumadocs để nó trong children (folder.index rỗng); nhận ra bằng tên trùng
 * tên thư mục — index.md mang đúng title của thư mục.
 */
function trangTongQuan(folder: Folder) {
  if (folder.index) return folder.index;
  const c = folder.children.find((n) => n.type === "page" && n.name === folder.name);
  return c?.type === "page" ? c : undefined;
}

function ThuMuc({ folder: goc, url, onChon }: { folder: Folder; url: string; onChon?: () => void }) {
  const tongQuan = trangTongQuan(goc);
  const folder = { ...goc, index: tongQuan };
  // Khu gốc (ThingEdu / Maker Việt) luôn mở; khóa học chỉ mở khi đang đọc trong đó.
  const moSan = folder.root === true || chuaTrang(folder, url);
  return (
    <details open={moSan} className="group">
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-1.5 text-sm font-semibold",
          "hover:bg-accent [&::-webkit-details-marker]:hidden",
          folder.root && "mt-4 text-xs uppercase tracking-wide text-foreground",
        )}
      >
        {folder.index ? (
          <Link
            href={folder.index.url}
            onClick={onChon}
            aria-current={folder.index.url === url ? "page" : undefined}
            className={cn(folder.index.url === url && "text-primary")}
          >
            {folder.name}
          </Link>
        ) : (
          folder.name
        )}
        <span aria-hidden className="text-muted-foreground transition-transform group-open:rotate-90">
          ›
        </span>
      </summary>
      <div className="ml-2 border-l border-border pl-2">
        {/* trang tổng quan đã là tiêu đề thư mục — không liệt kê lại lần nữa */}
        <CayCon
          nodes={folder.children.filter((c) => c !== tongQuan)}
          url={url}
          onChon={onChon}
        />
      </div>
    </details>
  );
}

function NoiDungCay({ tree, onChon }: { tree: Root; onChon?: () => void }) {
  const url = publicPath(usePathname());
  return (
    <nav aria-label="Mục lục thư viện khóa học">
      <CayCon nodes={tree.children} url={url} onChon={onChon} />
    </nav>
  );
}

export function ThanhBen({ tree }: { tree: Root }) {
  return (
    <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto pb-8 pr-2 lg:block">
      <NoiDungCay tree={tree} />
    </aside>
  );
}

/** Màn hình hẹp: mục lục nằm trong ngăn kéo, đóng lại khi chọn trang. */
export function ThanhBenDiDong({ tree }: { tree: Root }) {
  const [mo, setMo] = useState(false);
  return (
    <Sheet open={mo} onOpenChange={setMo}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <ListTree className="h-4 w-4" aria-hidden />
          Mục lục khóa học
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto p-4">
        <SheetTitle className="mb-2">Thư viện khóa học</SheetTitle>
        <SheetDescription className="sr-only">Chọn một khóa học hoặc một phần để đọc.</SheetDescription>
        <NoiDungCay tree={tree} onChon={() => setMo(false)} />
      </SheetContent>
    </Sheet>
  );
}
