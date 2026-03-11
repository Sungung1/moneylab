import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "복리 계산기 | 투자 수익률 계산",
  "복리, 월 추가 투자금, 투자 기간을 반영해 예상 자산과 수익을 계산하는 한국어 투자 계산기입니다.",
  "/compound-interest-calculator",
);

export default function Page() {
  return <CompoundInterestCalculator />;
}
