"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateFire } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency, formatNumber } from "@/utils/format";

export function FireCalculator() {
  const [annualSpending, setAnnualSpending] = useState(40_000_000);
  const [currentAssets, setCurrentAssets] = useState(150_000_000);
  const [annualSavings, setAnnualSavings] = useState(20_000_000);
  const [annualReturn, setAnnualReturn] = useState(6);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const { result, recalculate } = useCalculatorResult(
    () =>
      calculateFire(
        annualSpending,
        currentAssets,
        annualSavings,
        annualReturn,
        withdrawalRate,
      ),
    [annualReturn, annualSavings, annualSpending, currentAssets, withdrawalRate],
  );

  return (
    <CalculatorShell
      icon="fire"
      title="FIRE 계산기"
      description="연간 생활비, 현재 자산, 연간 저축액, 수익률, 인출률을 입력하면 FIRE 목표 자산과 예상 달성 시점을 계산합니다. 장기 은퇴 자산 계획 검토에 적합합니다."
      explanationTitle="FIRE 계산 기준"
      explanationText="연간 지출을 안전 인출률로 나누어 목표 자산을 계산하고, 현재 자산과 연간 저축액이 수익률만큼 성장한다고 가정했습니다. 수익률과 지출 변동성은 실제 결과에 큰 영향을 줄 수 있습니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="연간 생활비" value={annualSpending} onChange={setAnnualSpending} suffix="원" min={0} step={100000} />
        <InputField label="현재 자산" value={currentAssets} onChange={setCurrentAssets} suffix="원" min={0} step={100000} />
        <InputField label="연간 저축액" value={annualSavings} onChange={setAnnualSavings} suffix="원" min={0} step={100000} />
        <InputField label="예상 수익률" value={annualReturn} onChange={setAnnualReturn} suffix="%" min={0} step={0.1} />
        <InputField label="안전 인출률" value={withdrawalRate} onChange={setWithdrawalRate} suffix="%" min={0.1} step={0.1} />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_100%)] px-5 py-3.5 text-sm font-bold text-slate-950 shadow-[0_18px_40px_rgba(249,115,22,0.22)]"
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
            label="FIRE 목표 자산"
            value={formatKoreanCurrency(result.targetAssets)}
            secondaryValue={formatCurrency(result.targetAssets)}
          />
          <ResultCard label="예상 달성 기간" value={`${formatNumber(result.years)}년`} />
        </ResultGrid>
      </ResultDashboard>
    </CalculatorShell>
  );
}
