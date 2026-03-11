"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateRetirement } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency } from "@/utils/format";

export function RetirementCalculator() {
  const [currentAssets, setCurrentAssets] = useState(200_000_000);
  const [monthlyContribution, setMonthlyContribution] = useState(1_000_000);
  const [annualReturn, setAnnualReturn] = useState(5.5);
  const [years, setYears] = useState(20);
  const [monthlyExpense, setMonthlyExpense] = useState(3_000_000);

  const { result, recalculate } = useCalculatorResult(
    () =>
      calculateRetirement(
        currentAssets,
        monthlyContribution,
        annualReturn,
        years,
        monthlyExpense,
      ),
    [annualReturn, currentAssets, monthlyContribution, monthlyExpense, years],
  );

  return (
    <CalculatorShell
      icon="retirement"
      title="은퇴 준비 계산기"
      description="현재 자산, 월 저축액, 예상 수익률, 은퇴 시점 생활비를 입력하면 목표 은퇴 자산과 부족분을 계산합니다. 장기 은퇴 준비 상태를 빠르게 점검할 수 있습니다."
      explanationTitle="은퇴 목표 자산 계산"
      explanationText="은퇴 후 연간 생활비의 25배를 목표 자산으로 가정한 단순 모델입니다. 실제 은퇴 계획은 물가상승률, 연금 수령액, 의료비, 세금 등을 함께 고려해야 합니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="현재 자산" value={currentAssets} onChange={setCurrentAssets} suffix="원" min={0} step={100000} />
        <InputField label="월 저축액" value={monthlyContribution} onChange={setMonthlyContribution} suffix="원" min={0} step={10000} />
        <InputField label="예상 연 수익률" value={annualReturn} onChange={setAnnualReturn} suffix="%" min={0} step={0.1} />
        <InputField label="은퇴까지 기간" value={years} onChange={setYears} suffix="년" min={1} step={1} />
        <InputField label="예상 월 생활비" value={monthlyExpense} onChange={setMonthlyExpense} suffix="원" min={0} step={10000} />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#0f766e_100%)] px-5 py-3.5 text-sm font-bold text-white"
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
          <ResultCard
            label="목표 은퇴 자산"
            value={formatKoreanCurrency(result.targetAssets)}
            secondaryValue={formatCurrency(result.targetAssets)}
          />
          <ResultCard
            label="목표 대비 차이"
            value={formatKoreanCurrency(result.gap)}
            secondaryValue={formatCurrency(result.gap)}
            caption="양수면 목표 초과, 음수면 부족"
          />
        </ResultGrid>
      </ResultDashboard>
    </CalculatorShell>
  );
}
