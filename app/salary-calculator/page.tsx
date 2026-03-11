import { SalaryCalculator } from "@/components/calculators/SalaryCalculator";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "연봉 계산기 | 실수령액 계산",
  "연봉, 상여금, 비과세 수당을 입력해 예상 월 실수령액을 계산하는 한국어 급여 계산기입니다.",
  "/salary-calculator",
);

export default function Page() {
  return <SalaryCalculator />;
}
