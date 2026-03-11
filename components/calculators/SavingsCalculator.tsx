"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { ChartCard } from "@/components/ui/ChartCard";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateSavings } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency, formatPercent } from "@/utils/format";

export function SavingsCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(500_000);
  const [annualRate, setAnnualRate] = useState(3.5);
  const [years, setYears] = useState(3);
  const [taxRate, setTaxRate] = useState(15.4);

  const { result, recalculate } = useCalculatorResult(
    () => calculateSavings(monthlyDeposit, annualRate, years, taxRate),
    [annualRate, monthlyDeposit, taxRate, years],
  );

  return (
    <CalculatorShell
      icon="savings"
      title="적금 계산기"
      description="월 납입액, 금리, 가입 기간, 세율을 입력하면 적금 만기 예상액과 세후 수령액을 계산합니다. 은행 적금 상품 비교와 단기 목돈 마련 계획에 맞춘 계산기입니다."
      explanationTitle="적금 계산 방식"
      explanationText="매월 같은 금액을 납입하고 월 복리로 이자가 붙는 단순 모델로 계산합니다. 실제 금융상품은 우대금리, 일할 계산, 세제 혜택 여부에 따라 결과가 달라질 수 있습니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="월 납입액" value={monthlyDeposit} onChange={setMonthlyDeposit} suffix="원" min={0} step={10000} />
        <InputField label="연 이자율" value={annualRate} onChange={setAnnualRate} suffix="%" min={0} step={0.1} />
        <InputField label="가입 기간" value={years} onChange={setYears} suffix="년" min={1} step={1} />
        <InputField label="이자소득세율" value={taxRate} onChange={setTaxRate} suffix="%" min={0} step={0.1} />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_100%)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_rgba(20,184,166,0.25)]"
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
            label="세전 만기금"
            value={formatKoreanCurrency(result.preTaxAmount)}
            secondaryValue={formatCurrency(result.preTaxAmount)}
          />
          <ResultCard
            label="세율 반영"
            value={formatPercent(taxRate)}
            caption="일반과세 기준 단순 추정"
          />
        </ResultGrid>
        <ChartCard
          title="적금 성장 차트"
          description="가입 기간 동안의 적립금 성장 추이를 확인할 수 있습니다."
          labels={result.chart.labels}
          values={result.chart.values}
        />
        <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
          <h2 className="text-xl font-bold text-slate-950">비교 포인트</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            동일한 월 납입액이라도 가입 기간과 세후 기준 수령액에 따라 체감
            수익이 달라집니다. 여러 금리 조건을 넣어 비교해 보세요.
          </p>
        </section>
      </ResultDashboard>
    </CalculatorShell>
  );
}
