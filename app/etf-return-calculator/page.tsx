import { EtfReturnCalculator } from "@/components/calculators/EtfReturnCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "ETF 수익률 계산기 | ETF 투자 수익 계산",
  "초기 투자금, 적립액, 예상 수익률, 총보수를 반영해 ETF 장기 투자 수익을 계산하는 한국어 ETF 계산기입니다.",
  "/etf-return-calculator",
);

export default function Page() {
  return <EtfReturnCalculator />;
}
