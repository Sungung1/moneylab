"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateEtfReturn } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency, formatPercent } from "@/utils/format";

export function EtfReturnCalculator() {
  const [principal, setPrincipal] = useState(20_000_000);
  const [monthlyContribution, setMonthlyContribution] = useState(300_000);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(15);
  const [expenseRatio, setExpenseRatio] = useState(0.25);

  const { result, recalculate } = useCalculatorResult(
    () =>
      calculateEtfReturn(
        principal,
        monthlyContribution,
        annualRate,
        years,
        expenseRatio,
      ),
    [annualRate, expenseRatio, monthlyContribution, principal, years],
  );

  return (
    <CalculatorShell
      icon="etf"
      title="ETF 수익률 계산기"
      description="초기 투자금, 월 적립액, 기대 수익률, 보수를 입력하면 ETF 장기 투자 수익을 계산합니다. 국내외 지수 ETF 적립식 투자 계획에 적합합니다."
      explanationTitle="ETF 장기 수익 계산"
      explanationText="연 기대 수익률에서 총보수를 차감한 순수익률을 기준으로 복리 계산합니다. 배당 재투자, 세금, 환율, 추적오차는 별도로 반영하지 않았습니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="초기 투자금" value={principal} onChange={setPrincipal} suffix="원" min={0} step={100000} />
        <InputField label="월 적립액" value={monthlyContribution} onChange={setMonthlyContribution} suffix="원" min={0} step={10000} />
        <InputField label="예상 연 수익률" value={annualRate} onChange={setAnnualRate} suffix="%" min={0} step={0.1} />
        <InputField label="ETF 총보수" value={expenseRatio} onChange={setExpenseRatio} suffix="%" min={0} step={0.01} />
        <InputField label="투자 기간" value={years} onChange={setYears} suffix="년" min={1} step={1} />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#0f766e_0%,#0284c7_100%)] px-5 py-3.5 text-sm font-bold text-white"
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
            label="순 적용 수익률"
            value={formatPercent(annualRate - expenseRatio)}
            caption="예상 수익률 - 총보수"
          />
          <ResultCard
            label="월 적립 투자"
            value={formatKoreanCurrency(monthlyContribution)}
            secondaryValue={formatCurrency(monthlyContribution)}
          />
        </ResultGrid>
      </ResultDashboard>
    </CalculatorShell>
  );
}
