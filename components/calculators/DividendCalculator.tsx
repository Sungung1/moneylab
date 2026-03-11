"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateDividend } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency, formatPercent } from "@/utils/format";

export function DividendCalculator() {
  const [investment, setInvestment] = useState(50_000_000);
  const [dividendYield, setDividendYield] = useState(4.5);
  const [growthRate, setGrowthRate] = useState(3);
  const [years, setYears] = useState(10);

  const { result, recalculate } = useCalculatorResult(
    () => calculateDividend(investment, dividendYield, growthRate, years),
    [dividendYield, growthRate, investment, years],
  );

  return (
    <CalculatorShell
      icon="dividend"
      title="배당 계산기"
      subtitle="배당 수익과 미래 배당 성장 시뮬레이션"
      description="투자금과 배당수익률, 배당 성장률, 보유 기간을 입력하면 연간 배당금과 누적 배당 추정치를 계산합니다. 배당주나 배당 ETF 현금흐름 시뮬레이션에 적합합니다."
      explanationTitle="배당 시뮬레이션 안내"
      explanationText="현재 배당수익률을 기준으로 연간 배당금을 계산하고, 배당 성장률이 매년 동일하게 유지된다고 가정합니다. 세금과 환율, 실제 기업 배당 정책 변화는 반영하지 않았습니다."
    >
      <div className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur md:p-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
            입력 설정
          </p>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            배당 시나리오를 설정하세요
          </h2>
          <p className="text-sm leading-6 text-slate-500">
            입력값은 자동으로 포맷되며, 결과는 아래 요약 카드에서 바로 확인할 수 있습니다.
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />

        <div className="grid gap-4">
          <InputField label="투자금" value={investment} onChange={setInvestment} suffix="원" min={0} step={100000} />
          <InputField label="배당수익률" value={dividendYield} onChange={setDividendYield} suffix="%" min={0} step={0.1} />
          <InputField label="배당 성장률" value={growthRate} onChange={setGrowthRate} suffix="%" step={0.1} />
          <InputField label="보유 기간" value={years} onChange={setYears} suffix="년" min={1} step={1} />
        </div>

        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-[1.25rem] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_60%,#334155_100%)] px-5 py-4 text-sm font-bold text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)]"
        >
          계산하기
        </button>

        <div className="h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                핵심 결과
              </p>
              <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-950">
                배당 투자 요약
              </h3>
            </div>
          </div>
        </div>
      </div>

      <ResultDashboard>
        <ResultGrid>
          <ResultCard
            label="총 투자금"
            value={formatKoreanCurrency(result.totalInvestment)}
            secondaryValue={formatCurrency(result.totalInvestment)}
            tone="neutral"
          />
          <ResultCard
            label="총 수익"
            value={formatKoreanCurrency(result.totalProfit)}
            secondaryValue={formatCurrency(result.totalProfit)}
            tone="positive"
          />
          <ResultCard
            label="최종 금액"
            value={formatKoreanCurrency(result.finalAmount)}
            secondaryValue={formatCurrency(result.finalAmount)}
          />
          <ResultCard
            label="현재 연간 배당"
            value={formatKoreanCurrency(result.annualDividend)}
            secondaryValue={formatCurrency(result.annualDividend)}
          />
          <ResultCard
            label="월 평균 배당"
            value={formatKoreanCurrency(result.monthlyDividend)}
            secondaryValue={formatCurrency(result.monthlyDividend)}
          />
          <ResultCard
            label={`${years}년 후 예상 배당`}
            value={formatKoreanCurrency(result.futureDividend)}
            secondaryValue={formatCurrency(result.futureDividend)}
          />
          <ResultCard
            label="배당 성장률"
            value={formatPercent(growthRate)}
            caption="연평균 배당 증가 가정"
          />
        </ResultGrid>
      </ResultDashboard>
    </CalculatorShell>
  );
}
