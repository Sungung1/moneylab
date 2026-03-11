"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculatePension } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency, formatNumber } from "@/utils/format";

export function PensionCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyContribution, setMonthlyContribution] = useState(500_000);
  const [annualReturn, setAnnualReturn] = useState(5);

  const { result, recalculate } = useCalculatorResult(
    () =>
      calculatePension(
        currentAge,
        retirementAge,
        monthlyContribution,
        annualReturn,
      ),
    [annualReturn, currentAge, monthlyContribution, retirementAge],
  );

  return (
    <CalculatorShell
      icon="pension"
      title="연금 계산기"
      description="현재 나이, 은퇴 나이, 월 납입액, 수익률을 입력하면 은퇴 시점 예상 연금 자산을 계산합니다. 개인연금과 퇴직연금 적립 시뮬레이션에 활용할 수 있습니다."
      explanationTitle="연금 자산 시뮬레이션"
      explanationText="월 납입액이 동일하게 유지되고 수익률이 일정하다고 가정한 복리 계산입니다. 실제 연금 상품의 세액공제, 수수료, 자산배분 변화는 별도 고려가 필요합니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="현재 나이" value={currentAge} onChange={setCurrentAge} suffix="세" min={20} step={1} />
        <InputField label="은퇴 나이" value={retirementAge} onChange={setRetirementAge} suffix="세" min={currentAge} step={1} />
        <InputField label="월 납입액" value={monthlyContribution} onChange={setMonthlyContribution} suffix="원" min={0} step={10000} />
        <InputField label="예상 연 수익률" value={annualReturn} onChange={setAnnualReturn} suffix="%" min={0} step={0.1} />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#7c3aed_0%,#2563eb_100%)] px-5 py-3.5 text-sm font-bold text-white"
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
          <ResultCard label="남은 적립 기간" value={`${formatNumber(result.years)}년`} />
          <ResultCard
            label="월 납입액"
            value={formatKoreanCurrency(monthlyContribution)}
            secondaryValue={formatCurrency(monthlyContribution)}
          />
        </ResultGrid>
      </ResultDashboard>
    </CalculatorShell>
  );
}
