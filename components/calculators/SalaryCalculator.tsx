"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateSalary } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency } from "@/utils/format";

export function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState(50_000_000);
  const [annualBonus, setAnnualBonus] = useState(0);
  const [nonTaxableMonthly, setNonTaxableMonthly] = useState(200_000);

  const { result, recalculate } = useCalculatorResult(
    () => calculateSalary(annualSalary, annualBonus, nonTaxableMonthly),
    [annualBonus, annualSalary, nonTaxableMonthly],
  );

  return (
    <CalculatorShell
      icon="salary"
      title="연봉 계산기"
      description="연봉, 상여금, 비과세 수당을 입력하면 예상 월 실수령액과 연간 공제액을 계산합니다. 한국 급여 체계에 맞춘 빠른 추정 계산기로 사용할 수 있습니다."
      explanationTitle="연봉 계산 참고"
      explanationText="국민연금, 건강보험, 장기요양보험, 고용보험, 소득세, 지방소득세를 단순화한 모델입니다. 실제 급여명세서는 회사별 공제 항목과 세법 적용 방식에 따라 차이가 발생할 수 있습니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="연봉" value={annualSalary} onChange={setAnnualSalary} suffix="원" min={0} step={100000} />
        <InputField label="연간 상여금" value={annualBonus} onChange={setAnnualBonus} suffix="원" min={0} step={100000} />
        <InputField
          label="월 비과세 수당"
          value={nonTaxableMonthly}
          onChange={setNonTaxableMonthly}
          suffix="원"
          min={0}
          step={10000}
          description="식대 등 비과세 항목의 단순 추정값입니다."
        />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#1d4ed8_0%,#0ea5e9_100%)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_rgba(14,165,233,0.25)]"
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
            caption="예상 월 실수령액"
          />
          <ResultCard
            label="예상 연 실수령액"
            value={formatKoreanCurrency(result.annualNet)}
            secondaryValue={formatCurrency(result.annualNet)}
          />
          <ResultCard
            label="연간 총 공제액"
            value={formatKoreanCurrency(result.annualDeductions)}
            secondaryValue={formatCurrency(result.annualDeductions)}
          />
          <ResultCard
            label="국민연금 추정"
            value={formatKoreanCurrency(result.pension)}
            secondaryValue={formatCurrency(result.pension)}
          />
          <ResultCard
            label="세금 및 보험"
            value={formatKoreanCurrency(result.tax + result.health)}
            secondaryValue={formatCurrency(result.tax + result.health)}
            caption={`건강보험 ${formatCurrency(result.health)} 포함`}
          />
        </ResultGrid>
      </ResultDashboard>
    </CalculatorShell>
  );
}
