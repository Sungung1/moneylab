import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";

type CalculatorShellProps = {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  subtitle?: string;
  description: string;
  explanationTitle: string;
  explanationText: string;
  children: ReactNode;
};

export function CalculatorShell({
  icon,
  title,
  subtitle,
  description,
  explanationTitle,
  explanationText,
  children,
}: CalculatorShellProps) {
  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="rounded-[2.25rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(241,248,255,0.96)_45%,rgba(234,244,255,0.98)_100%)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 md:p-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="flex items-start gap-4">
            <div className="rounded-[1.35rem] bg-white p-3 text-sky-700 shadow-[0_18px_40px_rgba(14,165,233,0.12)] ring-1 ring-sky-100">
              <Icon name={icon} className="h-6 w-6" />
            </div>
            <div className="space-y-3">
              <span className="inline-flex rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase shadow-sm">
                MoneyLab Calculator
              </span>
              <div className="space-y-2">
                <h1 className="text-2xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="text-sm font-medium text-slate-600 md:text-base">
                    {subtitle}
                  </p>
                ) : null}
              </div>
              <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-[15px]">
                {description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:min-w-[220px]">
            {[
              ["대시보드형 UI", "더 넓은 간격과 요약 카드"],
              ["한국어 금융 입력", "천 단위 구분 자동 적용"],
            ].map(([headline, body]) => (
              <div
                key={headline}
                className="rounded-[1.35rem] border border-white/80 bg-white/80 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
              >
                <p className="text-sm font-bold tracking-tight text-slate-800">
                  {headline}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {children}
      </section>

      <section className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur md:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-950 md:text-2xl">
          {explanationTitle}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
          {explanationText}
        </p>
      </section>
    </div>
  );
}
