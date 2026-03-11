import { CurrencyCalculator } from "@/components/calculators/CurrencyCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "환율 계산기 | 환전 금액 계산",
  "외화 금액, 환율, 수수료를 입력해 원화 기준 환전 금액을 계산하는 한국어 환율 계산기입니다.",
  "/currency-calculator",
);

export default function Page() {
  return <CurrencyCalculator />;
}
