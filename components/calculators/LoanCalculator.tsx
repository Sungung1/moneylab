"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateLoan } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency } from "@/utils/format";

export function LoanCalculator() {
  const [principal, setPrincipal] = useState(300_000_000);
  const [annualRate, setAnnualRate] = useState(4.2);
  const [years, setYears] = useState(30);

  const { result, recalculate } = useCalculatorResult(
    () => calculateLoan(principal, annualRate, years),
    [annualRate, principal, years],
  );

  return (
    <CalculatorShell
      icon="loan"
      title="대출 계산기"
      description="대출 원금, 금리, 기간을 입력하면 원리금균등 상환 기준 월 납입액과 총 이자를 계산합니다. 주택담보대출, 전세대출, 신용대출 시뮬레이션에 활용할 수 있습니다."
      explanationTitle="대출 계산 안내"
      explanationText="원리금균등 상환 방식으로 매월 같은 금액을 납부한다고 가정했습니다. 중도상환수수료, 우대금리, 변동금리 변화는 포함하지 않았으므로 실제 금융상품과 차이가 있을 수 있습니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="대출 원금" value={principal} onChange={setPrincipal} suffix="원" min={0} step={1000000} />
        <InputField label="연 이자율" value={annualRate} onChange={setAnnualRate} suffix="%" min={0} step={0.1} />
        <InputField label="상환 기간" value={years} onChange={setYears} suffix="년" min={1} step={1} />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#be123c_0%,#fb7185_100%)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_rgba(244,63,94,0.24)]"
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
            caption="총 이자"
          />
          <ResultCard
            label="최종 금액"
            value={formatKoreanCurrency(result.finalAmount)}
            secondaryValue={formatCurrency(result.finalAmount)}
            caption="총 상환액"
          />
          <ResultCard
            label="월 상환액"
            value={formatKoreanCurrency(result.monthlyPayment)}
            secondaryValue={formatCurrency(result.monthlyPayment)}
          />
          <ResultCard
            label="상환 방식"
            value="원리금균등"
            caption="매월 동일한 금액을 납입하는 기준"
          />
        </ResultGrid>
      </ResultDashboard>
    </CalculatorShell>
  );
}
