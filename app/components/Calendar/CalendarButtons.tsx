import { CalendarButtonsProps } from "@/app/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CalendarButtons({
  onPreviousMonth,
  onCurrentMonth,
  onNextMonth,
}: CalendarButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPreviousMonth}
        className="flex h-8 w-8 cursor-pointer items-center bg-neutral-900 justify-center rounded-lg border border-white/20 text-neutral-400 transition hover:border-white/50 hover:text-neutral-300"
      >
        <ChevronLeft size={16} />
      </button>

      <button
        type="button"
        onClick={onCurrentMonth}
        className="flex h-8 cursor-pointer items-center justify-center bg-neutral-900  rounded-lg border border-white/20 px-3 text-xs font-medium text-neutral-400 transition hover:border-white/50 hover:text-neutral-300"
      >
        Hoy
      </button>

      <button
        type="button"
        onClick={onNextMonth}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-neutral-900 text-neutral-400 transition hover:border-white/50 hover:text-neutral-300"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
