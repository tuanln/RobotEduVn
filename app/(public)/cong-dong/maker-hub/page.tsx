import type { Metadata } from "next";
import { MapPin, Clock, Users, Cpu, Mail, ExternalLink } from "lucide-react";
import { getHubs } from "@/lib/sheets";
import { hubMapUrl } from "@/lib/content/hubs";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import type { MakerHub } from "@/lib/types";

export const metadata: Metadata = {
  title: "Mạng Lưới Robot Hub",
  description:
    "Tìm Robot Hub (Làng Maker) gần bạn — không gian sáng tạo STEM & Robot tại FPT Shop và các địa điểm đối tác.",
};

const typeLabels: Record<MakerHub["type"], { label: string; color: string }> = {
  "fpt-shop": {
    label: "FPT Shop",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
  clb: {
    label: "CLB Robotics",
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  "truong-hoc": {
    label: "Trường Học",
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
};

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden />
      <div className="min-w-0">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

const pending = (
  <span className="text-muted-foreground">Đang cập nhật</span>
);

function HubCard({ hub }: { hub: MakerHub }) {
  const typeInfo = typeLabels[hub.type];

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold leading-snug">{hub.name}</h3>
          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeInfo.color}`}
          >
            {typeInfo.label}
          </span>
        </div>
        <MapPin className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{hub.address}</p>

      <div className="mt-5 space-y-4 border-t border-border pt-5">
        <Detail icon={Clock} label="Lịch sinh hoạt">
          {hub.schedule || pending}
        </Detail>
        <Detail icon={Users} label="Mentor">
          {hub.mentors.length > 0 ? hub.mentors.join(", ") : pending}
        </Detail>
        <Detail icon={Cpu} label="Thiết bị">
          {hub.equipment.length > 0 ? (
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
          ) : (
            pending
          )}
        </Detail>
        <Detail icon={Mail} label="Liên hệ">
          <a
            href={`mailto:${hub.contact}`}
            className="text-primary hover:underline"
          >
            {hub.contact}
          </a>
        </Detail>
      </div>

      <a
        href={hubMapUrl(hub)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Xem đường đi trên Google Maps
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </a>
    </article>
  );
}

export default async function MakerHubPage() {
  const hubs = await getHubs();

  const cities = [...new Set(hubs.map((h) => h.city).filter(Boolean))];

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Mạng Lưới Robot Hub"
          subtitle='"Làng Maker" — không gian sáng tạo STEM & Robot tại địa phương'
        />

        {hubs.length > 0 && (
          <div className="mb-12 grid grid-cols-2 gap-4 text-center sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-3xl font-extrabold text-primary">
                {hubs.length}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Hub đang hoạt động
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-3xl font-extrabold text-primary">
                {cities.length}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Tỉnh thành</p>
            </div>
            <div className="col-span-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5 sm:col-span-1">
              <div className="text-sm font-semibold">Mở hub tại nơi bạn ở?</div>
              <a
                href="mailto:lang@makerviet.org?subject=Đăng%20ký%20mở%20Robot%20Hub"
                className="mt-1 inline-block text-sm text-primary hover:underline"
              >
                Gửi đăng ký &rarr;
              </a>
            </div>
          </div>
        )}

        {cities.map((city) => (
          <section key={city} className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <MapPin className="h-5 w-5 text-primary" aria-hidden />
              {city}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {hubs
                .filter((h) => h.city === city)
                .map((hub) => (
                  <HubCard key={hub.id} hub={hub} />
                ))}
            </div>
          </section>
        ))}

        {hubs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-lg font-medium">Chưa có Robot Hub nào mở cửa</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Mạng lưới đang được xây dựng. Liên hệ để mở hub đầu tiên tại địa
              phương của bạn.
            </p>
            <Button asChild className="mt-6">
              <a href="mailto:lang@makerviet.org?subject=Đăng%20ký%20mở%20Robot%20Hub">
                Đăng ký mở hub
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
