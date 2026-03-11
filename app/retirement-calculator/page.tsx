import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "은퇴 준비 계산기 | 은퇴 목표 자산 계산",
  "현재 자산, 월 저축액, 예상 수익률, 생활비를 입력해 은퇴 준비 자산과 부족분을 계산하는 한국어 은퇴 계산기입니다.",
  "/retirement-calculator",
);

export default function Page() {
  return <RetirementCalculator />;
}
