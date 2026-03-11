"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { ChartCard } from "@/components/ui/ChartCard";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateCompoundInterest } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency, formatPercent } from "@/utils/format";

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10_000_000);
  const [monthlyContribution, setMonthlyContribution] = useState(500_000);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(10);

  const { result, recalculate } = useCalculatorResult(
    () =>
      calculateCompoundInterest(principal, monthlyContribution, annualRate, years),
    [annualRate, monthlyContribution, principal, years],
  );

  return (
    <CalculatorShell
      icon="investment"
      title="투자 계산기"
      description="초기 투자금, 월 추가 투자금, 예상 수익률, 투자 기간을 입력하면 복리 기준 예상 자산과 총 수익을 계산합니다. ETF 적립식 투자와 장기 자산 형성 계획을 검토할 때 적합한 계산기입니다."
      explanationTitle="복리 계산 방식"
      explanationText="매월 말 일정 금액을 추가 투자하고, 연 수익률을 월 단위로 나누어 적용하는 방식으로 계산합니다. 실제 투자 결과는 세금, 수수료, 시장 변동성에 따라 달라질 수 있으므로 참고용 추정치로 활용하는 것이 적절합니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="초기 투자금" value={principal} onChange={setPrincipal} suffix="원" min={0} step={100000} />
        <InputField
          label="월 추가 투자금"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          suffix="원"
          min={0}
          step={10000}
        />
        <InputField label="예상 연 수익률" value={annualRate} onChange={setAnnualRate} suffix="%" min={0} step={0.1} />
        <InputField label="투자 기간" value={years} onChange={setYears} suffix="년" min={1} step={1} />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#0369a1_100%)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_rgba(3,105,161,0.25)]"
        >
          계산하기
        </button>
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
        </ResultGrid>
        <ResultGrid>
          <ResultCard
            label="월 적립액"
            value={formatKoreanCurrency(monthlyContribution)}
            secondaryValue={formatCurrency(monthlyContribution)}
            caption={`연 수익률 ${formatPercent(annualRate)} 가정`}
          />
          <ResultCard
            label="예상 수익 비중"
            value={formatPercent(
              (result.totalProfit / Math.max(result.totalInvestment, 1)) * 100,
            )}
            caption="총 투자금 대비 예상 수익률"
          />
        </ResultGrid>
        <ChartCard
          title="자산 성장 차트"
          description="연도별 자산 누적 추이를 확인할 수 있습니다."
          labels={result.chart.labels}
          values={result.chart.values}
        />
        <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
          <h2 className="text-xl font-bold text-slate-950">활용 팁</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            투자 기간을 바꾸면서 월 적립식 투자금이 장기 성과에 미치는 영향을
            비교하면 목표 자산 달성 전략을 더 현실적으로 세울 수 있습니다.
          </p>
        </section>
      </ResultDashboard>
    </CalculatorShell>
  );
}
