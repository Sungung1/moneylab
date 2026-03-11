"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateCurrency } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency, formatNumber, formatPercent } from "@/utils/format";

export function CurrencyCalculator() {
  const [amount, setAmount] = useState(1_000);
  const [exchangeRate, setExchangeRate] = useState(1_450);
  const [feeRate, setFeeRate] = useState(1.75);

  const { result, recalculate } = useCalculatorResult(
    () => calculateCurrency(amount, exchangeRate, feeRate),
    [amount, exchangeRate, feeRate],
  );

  return (
    <CalculatorShell
      icon="currency"
      title="환율 계산기"
      description="외화 금액, 환율, 환전 수수료를 입력하면 원화 기준 환전 금액을 계산합니다. 해외 투자와 여행 경비 환전 계획을 빠르게 확인할 수 있습니다."
      explanationTitle="환율 계산 방식"
      explanationText="입력한 외화 금액에 환율을 곱해 원화 환산 금액을 구한 뒤, 환전 수수료를 차감한 최종 수령 금액을 계산합니다. 실제 은행 우대환율과 전신환 매매기준율은 다를 수 있습니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="외화 금액" value={amount} onChange={setAmount} suffix="USD" min={0} step={1} />
        <InputField label="환율" value={exchangeRate} onChange={setExchangeRate} suffix="원" min={0} step={0.1} />
        <InputField label="수수료율" value={feeRate} onChange={setFeeRate} suffix="%" min={0} step={0.01} />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#1e293b_0%,#0ea5e9_100%)] px-5 py-3.5 text-sm font-bold text-white"
        >
          계산하기
        </button>
      </div>
      <ResultDashboard>
        <ResultGrid>
          <ResultCard label="총 투자금" value={`${formatNumber(result.totalInvestment)} USD`} tone="neutral" />
          <ResultCard
            label="총 수익"
            value={formatKoreanCurrency(result.totalProfit)}
            secondaryValue={formatCurrency(result.totalProfit)}
            tone="positive"
            caption="예상 환전 수수료"
          />
          <ResultCard
            label="최종 금액"
            value={formatKoreanCurrency(result.finalAmount)}
            secondaryValue={formatCurrency(result.finalAmount)}
          />
          <ResultCard
            label="수수료 전 환산액"
            value={formatKoreanCurrency(result.converted)}
            secondaryValue={formatCurrency(result.converted)}
          />
          <ResultCard label="적용 수수료율" value={formatPercent(feeRate)} />
        </ResultGrid>
      </ResultDashboard>
    </CalculatorShell>
  );
}
