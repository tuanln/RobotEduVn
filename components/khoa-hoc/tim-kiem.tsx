"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { useDocsSearch } from "fumadocs-core/search/client";
import { fetchClient } from "fumadocs-core/search/client/fetch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { tachDanhDau } from "@/lib/khoa-hoc/tim";

const client = fetchClient({ api: "/api/khoa-hoc/tim" });

// Gốc cây mục lục mang tên mặc định "Docs" của fumadocs — không cho người đọc thấy.
const TEN_GOC = "Docs";
const TOI_DA = 40;

function ChuDanhDau({ noiDung }: { noiDung: string }) {
  return (
    <>
      {tachDanhDau(noiDung).map((d, i) =>
        d.khop ? (
          <mark key={i} className="rounded-sm bg-primary/20 px-0.5 text-foreground">
            {d.chu}
          </mark>
        ) : (
          <span key={i}>{d.chu}</span>
        ),
      )}
    </>
  );
}

export function TimKiem() {
  const [mo, setMo] = useState(false);
  const { search, setSearch, query } = useDocsSearch({ client });
  const tatCa = query.data === "empty" ? [] : (query.data ?? []);
  const ketQua = tatCa.slice(0, TOI_DA);

  return (
    <Dialog open={mo} onOpenChange={setMo}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-start text-muted-foreground sm:w-64">
          <Search className="h-4 w-4" aria-hidden />
          Tìm trong khóa học…
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl gap-3 p-4">
        <DialogTitle>Tìm trong thư viện khóa học</DialogTitle>
        <DialogDescription className="sr-only">Gõ từ khóa có dấu, ví dụ “mạch VIA”.</DialogDescription>
        <Input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ví dụ: mạch VIA, động cơ, OpenBlock"
          aria-label="Từ khóa tìm kiếm"
        />
        <div className="max-h-[60vh] overflow-y-auto" aria-live="polite">
          {search.trim() !== "" && !query.isLoading && ketQua.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">Không thấy kết quả nào.</p>
          )}
          {query.error && (
            <p className="px-2 py-6 text-center text-sm text-destructive">Tìm kiếm đang lỗi, thử lại sau.</p>
          )}
          <ul className="space-y-1">
            {ketQua.map((kq) => (
              <li key={kq.id}>
                <Link
                  href={kq.url}
                  onClick={() => setMo(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  {kq.type === "page" && kq.breadcrumbs && (
                    <span className="block text-xs text-muted-foreground">
                      {kq.breadcrumbs.filter((b) => b !== TEN_GOC).join(" › ")}
                    </span>
                  )}
                  <span className={kq.type === "page" ? "font-semibold" : "text-muted-foreground"}>
                    <ChuDanhDau noiDung={kq.content} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {tatCa.length > TOI_DA && (
            <p className="px-3 py-2 text-xs text-muted-foreground">
              Đang hiện {TOI_DA} trong {tatCa.length} kết quả — gõ thêm từ để thu hẹp.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
