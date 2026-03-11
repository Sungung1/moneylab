import type { Metadata } from "next";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    keywords: [
      "한국 금융 계산기",
      title,
      "투자 계산기",
      "대출 계산기",
      "연봉 실수령 계산기",
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "머니랩 (MoneyLab) - 한국 금융 계산기",
      locale: "ko_KR",
      type: "website",
    },
  };
}
