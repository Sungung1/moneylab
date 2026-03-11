type ResultCardProps = {
  label: string;
  value: string;
  secondaryValue?: string;
  caption?: string;
  tone?: "default" | "positive" | "neutral";
};

const toneStyles = {
  default: "border-slate-200 bg-white",
  positive: "border-emerald-200 bg-white",
  neutral: "border-sky-200 bg-white",
};

export function ResultCard({
  label,
  value,
  secondaryValue,
  caption,
  tone = "default",
}: ResultCardProps) {
  return (
    <div
      className={`flex h-full w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-xl border bg-white p-6 text-center shadow-sm ${toneStyles[tone]}`}
    >
      <p className="min-w-0 text-sm font-semibold tracking-tight text-slate-500">
        {label}
      </p>
      <div className="mt-4 flex w-full min-w-0 flex-col items-center justify-center gap-2">
        <p className="whitespace-nowrap text-3xl font-bold leading-tight tracking-tight text-slate-950 tabular-nums">
          {value}
        </p>
        {secondaryValue ? (
          <p className="whitespace-nowrap text-sm text-gray-500 tabular-nums">
            {secondaryValue}
          </p>
        ) : null}
      </div>
      {caption ? (
        <p className="mt-3 min-w-0 text-xs leading-5 text-slate-500">{caption}</p>
      ) : null}
    </div>
  );
}
