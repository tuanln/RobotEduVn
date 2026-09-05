import type { Metadata } from "next";
import { getHubs } from "@/lib/sheets";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Mạng Lưới Maker Hub",
  description:
    "Tìm Maker Hub (Làng Maker) gần bạn — tại FPT Shop và các địa điểm đối tác trên toàn quốc.",
};

const typeLabels: Record<string, { label: string; color: string }> = {
  "fpt-shop": { label: "FPT Shop", color: "bg-blue-100 text-blue-700" },
  clb: { label: "CLB Robotics", color: "bg-emerald-100 text-emerald-700" },
  "truong-hoc": {
    label: "Trường Học",
    color: "bg-amber-100 text-amber-700",
  },
};

export default async function MakerHubPage() {
  const hubs = await getHubs();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Mạng Lưới Maker Hub"
          subtitle='"Làng Maker" — Không gian sáng tạo tại mỗi địa phương'
        />

        {/* Map placeholder */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto max-w-md">
            <p className="text-6xl">🗺️</p>
            <h3 className="mt-4 text-xl font-bold">Bản Đồ Maker Hub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {hubs.length} Hub trên toàn quốc — FPT Shop, CLB Robotics, Trường
              học đối tác
            </p>
          </div>
        </div>

        {/* Hub List */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {hubs.map((hub) => {
            const typeInfo = typeLabels[hub.type] || {
              label: hub.type,
              color: "bg-muted text-muted-foreground",
            };
            return (
              <div
                key={hub.id}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{hub.name}</h3>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeInfo.color}`}
                    >
                      {typeInfo.label}
                    </span>
                  </div>
                  <span className="text-2xl">📍</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {hub.address}
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Lịch sinh hoạt:</span>
                    <p className="text-muted-foreground">{hub.schedule}</p>
                  </div>
                  <div>
                    <span className="font-medium">Mentor:</span>
                    <p className="text-muted-foreground">
                      {hub.mentors.join(", ")}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Thiết bị:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {hub.equipment.map((eq) => (
                        <span
                          key={eq}
                          className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Liên hệ:</span>{" "}
                    <a
                      href={`mailto:${hub.contact}`}
                      className="text-primary hover:underline"
                    >
                      {hub.contact}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
