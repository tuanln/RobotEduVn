import { Badge } from "@/components/ui/badge";
import { LearningStage } from "@/lib/types";

const stageConfig: Record<
  LearningStage,
  { label: string; className: string }
> = {
  "kham-pha": {
    label: "Khám Phá",
    className: "bg-amber-100 text-amber-700 border-amber-300",
  },
  "tu-duy": {
    label: "Tư Duy",
    className: "bg-violet-100 text-violet-700 border-violet-300",
  },
  "lap-trinh": {
    label: "Lập Trình",
    className: "bg-emerald-100 text-emerald-700 border-emerald-300",
  },
  "iot-robot": {
    label: "IoT & Robot",
    className: "bg-red-100 text-red-700 border-red-300",
  },
  "chia-se": {
    label: "Chia Sẻ",
    className: "bg-blue-100 text-blue-700 border-blue-300",
  },
};

export function StageBadge({ stage }: { stage: LearningStage }) {
  const config = stageConfig[stage];
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
