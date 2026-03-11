export const navigationItems = [
  { href: "/", label: "홈" },
  { href: "/compound-interest-calculator", label: "투자 계산기" },
  { href: "/dividend-calculator", label: "배당 계산기" },
  { href: "/salary-calculator", label: "연봉 계산기" },
  { href: "/loan-calculator", label: "대출 계산기" },
  { href: "/savings-calculator", label: "적금 계산기" },
  { href: "/fire-calculator", label: "FIRE 계산기" },
] as const;

export const calculators = [
  {
    href: "/compound-interest-calculator",
    title: "투자 계산기",
    description: "복리, 적립식 투자, 예상 수익률을 기준으로 장기 자산 성장 시나리오를 계산합니다.",
    icon: "investment",
  },
  {
    href: "/dividend-calculator",
    title: "배당 계산기",
    description: "배당수익률과 배당 성장률을 바탕으로 예상 배당 현금흐름을 추정합니다.",
    icon: "dividend",
  },
  {
    href: "/salary-calculator",
    title: "연봉 계산기",
    description: "연봉과 비과세 수당을 반영해 월 실수령액과 연간 공제액을 계산합니다.",
    icon: "salary",
  },
  {
    href: "/loan-calculator",
    title: "대출 계산기",
    description: "원리금균등 상환 방식 기준 월 상환액과 총 이자를 빠르게 확인합니다.",
    icon: "loan",
  },
  {
    href: "/savings-calculator",
    title: "적금 계산기",
    description: "월 납입액과 금리, 세율을 반영해 적금 만기금과 세후 수령액을 계산합니다.",
    icon: "savings",
  },
  {
    href: "/fire-calculator",
    title: "FIRE 계산기",
    description: "은퇴 목표 자산과 달성 예상 시점을 계산해 조기 은퇴 계획을 검토합니다.",
    icon: "fire",
  },
  {
    href: "/stock-average-calculator",
    title: "주식 물타기 계산기",
    description: "추가 매수 수량과 단가를 입력해 평균 매입 단가를 계산합니다.",
    icon: "stock",
  },
  {
    href: "/etf-return-calculator",
    title: "ETF 수익률 계산기",
    description: "보수 차감을 반영한 ETF 장기 투자 수익을 추정합니다.",
    icon: "etf",
  },
  {
    href: "/currency-calculator",
    title: "환율 계산기",
    description: "환율과 수수료를 반영해 원화 기준 환전 금액을 계산합니다.",
    icon: "currency",
  },
  {
    href: "/pension-calculator",
    title: "연금 계산기",
    description: "은퇴 시점까지 월 납입액이 얼마나 성장하는지 복리 기준으로 계산합니다.",
    icon: "pension",
  },
  {
    href: "/retirement-calculator",
    title: "은퇴 준비 계산기",
    description: "예상 생활비와 자산 성장률을 반영해 은퇴 준비 부족분을 확인합니다.",
    icon: "retirement",
  },
] as const;
