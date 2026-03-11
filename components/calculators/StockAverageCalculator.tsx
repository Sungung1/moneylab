"use client";

import { useState } from "react";

import { useCalculatorResult } from "@/hooks/useCalculatorResult";
import { CalculatorShell } from "@/components/ui/CalculatorShell";
import { InputField } from "@/components/ui/InputField";
import { ResultCard } from "@/components/ui/ResultCard";
import { ResultDashboard } from "@/components/ui/ResultDashboard";
import { ResultGrid } from "@/components/ui/ResultGrid";
import { calculateStockAverage } from "@/utils/calculations";
import { formatCurrency, formatKoreanCurrency, formatNumber } from "@/utils/format";

export function StockAverageCalculator() {
  const [currentShares, setCurrentShares] = useState(100);
  const [currentAveragePrice, setCurrentAveragePrice] = useState(72_000);
  const [additionalShares, setAdditionalShares] = useState(50);
  const [additionalPrice, setAdditionalPrice] = useState(61_000);

  const { result, recalculate } = useCalculatorResult(
    () =>
      calculateStockAverage(
        currentShares,
        currentAveragePrice,
        additionalShares,
        additionalPrice,
      ),
    [additionalPrice, additionalShares, currentAveragePrice, currentShares],
  );

  return (
    <CalculatorShell
      icon="stock"
      title="주식 물타기 계산기"
      description="보유 수량, 평균 단가, 추가 매수 수량과 가격을 입력하면 새 평균 매입 단가를 계산합니다. 분할 매수 전략을 검토할 때 유용합니다."
      explanationTitle="주식 평균 단가 계산"
      explanationText="현재 보유 총매입금액과 추가 매수 금액을 합산한 뒤 총 수량으로 나누어 새 평균 단가를 계산합니다. 수수료와 세금은 포함하지 않은 단순 계산입니다."
    >
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
        <InputField label="현재 보유 수량" value={currentShares} onChange={setCurrentShares} suffix="주" min={0} step={1} />
        <InputField label="현재 평균 단가" value={currentAveragePrice} onChange={setCurrentAveragePrice} suffix="원" min={0} step={100} />
        <InputField label="추가 매수 수량" value={additionalShares} onChange={setAdditionalShares} suffix="주" min={0} step={1} />
        <InputField label="추가 매수 단가" value={additionalPrice} onChange={setAdditionalPrice} suffix="원" min={0} step={100} />
        <button
          type="button"
          onClick={recalculate}
          className="w-full rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_100%)] px-5 py-3.5 text-sm font-bold text-white"
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
            caption="추가 매수 단가와 평균 단가 차이"
          />
          <ResultCard
            label="최종 금액"
            value={formatKoreanCurrency(result.finalAmount)}
            secondaryValue={formatCurrency(result.finalAmount)}
            caption="새 평균 단가"
          />
          <ResultCard label="최종 보유 수량" value={`${formatNumber(result.totalShares)}주`} />
          <ResultCard
            label="추가 매수 금액"
            value={formatKoreanCurrency(additionalShares * additionalPrice)}
            secondaryValue={formatCurrency(additionalShares * additionalPrice)}
          />
        </ResultGrid>
      </ResultDashboard>
    </CalculatorShell>
  );
}
