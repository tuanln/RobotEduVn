import { SectionHeader } from "@/components/common/section-header";
import type { TrangChuContent } from "@/lib/content/trang-chu/types";

export function PartnersSection({ t }: { t: TrangChuContent["doiTac"] }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t.tieuDe} subtitle={t.phuDe} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {t.ds.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                {partner.name[0]}
              </div>
              <h3 className="mt-3 text-sm font-semibold">{partner.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {partner.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
