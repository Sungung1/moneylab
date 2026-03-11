import { PensionCalculator } from "@/components/calculators/PensionCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "연금 계산기 | 은퇴 자산 계산",
  "현재 나이, 은퇴 나이, 월 납입액, 수익률을 입력해 예상 연금 자산을 계산하는 한국어 연금 계산기입니다.",
  "/pension-calculator",
);

export default function Page() {
  return <PensionCalculator />;
}
