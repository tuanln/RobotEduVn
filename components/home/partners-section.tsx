import { SectionHeader } from "@/components/common/section-header";

const partners = [
  { name: "MakerViet", role: "Cộng đồng Maker & Mã nguồn mở" },
  { name: "ThingEdu", role: "Giáo dục STEM & Phần mềm" },
  { name: "Rogo", role: "Robot giáo dục ThingBot" },
  { name: "FPT Shop", role: "Mạng lưới Maker Hub" },
  { name: "FIRST Global", role: "Cuộc thi Robot quốc tế" },
  { name: "OpenSTEM", role: "Tổ chức điều phối" },
];

export function PartnersSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Đối Tác & Cộng Đồng"
          subtitle="Mặt trận thống nhất vì giáo dục STEM — Ai có súng dùng súng, ai có gươm dùng gươm"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
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
