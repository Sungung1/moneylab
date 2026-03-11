import { LoanCalculator } from "@/components/calculators/LoanCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "대출 계산기 | 월 상환액 계산",
  "대출 원금, 금리, 기간을 입력해 월 상환액과 총이자를 계산하는 한국어 대출 계산기입니다.",
  "/loan-calculator",
);

export default function Page() {
  return <LoanCalculator />;
}
