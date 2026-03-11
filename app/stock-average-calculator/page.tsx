import { StockAverageCalculator } from "@/components/calculators/StockAverageCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "주식 물타기 계산기 | 평균 단가 계산",
  "보유 수량, 평균 단가, 추가 매수 가격을 반영해 평균 매입 단가를 계산하는 한국어 주식 계산기입니다.",
  "/stock-average-calculator",
);

export default function Page() {
  return <StockAverageCalculator />;
}
