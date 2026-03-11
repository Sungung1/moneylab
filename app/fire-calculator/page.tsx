import { FireCalculator } from "@/components/calculators/FireCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "FIRE 계산기 | 조기 은퇴 자산 계산",
  "연간 생활비와 자산, 저축액을 바탕으로 FIRE 목표 자산과 달성 시점을 계산하는 한국어 FIRE 계산기입니다.",
  "/fire-calculator",
);

export default function Page() {
  return <FireCalculator />;
}
