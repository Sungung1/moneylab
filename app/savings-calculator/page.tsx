import { SavingsCalculator } from "@/components/calculators/SavingsCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "적금 계산기 | 적금 만기금 계산",
  "월 납입액과 금리를 입력해 적금 만기금과 세후 수령액을 계산하는 한국어 적금 계산기입니다.",
  "/savings-calculator",
);

export default function Page() {
  return <SavingsCalculator />;
}
