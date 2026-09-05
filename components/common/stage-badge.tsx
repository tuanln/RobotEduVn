import { Badge } from "@/components/ui/badge";
import { LearningStage } from "@/lib/types";

const stageConfig: Record<
  LearningStage,
  { label: string; className: string }
> = {
  "kham-pha": {
    label: "Khám Phá",
    className: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30",
  },
  "tu-duy": {
    label: "Tư Duy",
    className: "bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/30",
  },
  "lap-trinh": {
    label: "Lập Trình",
    className: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30",
  },
  "iot-robot": {
    label: "IoT & Robot",
    className: "bg-red-100 text-red-800 border-red-300 dark:bg-red-500/15 dark:text-red-300 dark:border-red-500/30",
  },
  "chia-se": {
    label: "Chia Sẻ",
    className: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30",
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
