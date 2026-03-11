import { DividendCalculator } from "@/components/calculators/DividendCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "배당 계산기 | 배당 수익 계산",
  "투자금과 배당수익률, 배당 성장률을 입력해 예상 배당 현금흐름을 계산하는 한국어 배당 계산기입니다.",
  "/dividend-calculator",
);

export default function Page() {
  return <DividendCalculator />;
}
