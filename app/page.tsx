import Link from "next/link";
import type { Metadata } from "next";

import { calculators } from "@/lib/calculators";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "머니랩 (MoneyLab) - 한국 금융 계산기",
  description:
    "투자, 배당, 연봉, 대출, 적금, FIRE, ETF, 환율, 연금 계산기를 한 곳에서 사용할 수 있는 한국어 금융 계산기 사이트입니다.",
};

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#081225_0%,#0f2d51_45%,#0369a1_100%)] p-8 text-white shadow-[0_32px_100px_rgba(15,23,42,0.22)] md:p-12">
        <div className="grid gap-8 md:grid-cols-[1.35fr_0.9fr] md:items-center">
          <div className="space-y-5">
            <span className="inline-flex w-fit rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-sky-100 ring-1 ring-white/15">
              머니랩 MoneyLab
            </span>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              한국 투자 · 금융 계산기 모음
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-100/85 md:text-lg">
              투자 계획, 배당 현금흐름, 연봉 실수령, 대출 상환, 적금 만기금,
              FIRE와 은퇴 준비까지 한국 사용자에게 익숙한 방식으로 빠르게
              계산할 수 있는 금융 도구 모음입니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compound-interest-calculator"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-50"
              >
                투자 계산기 시작
              </Link>
              <Link
                href="/stock-average-calculator"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/16"
              >
                추가 계산기 보기
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            {[
              ["시장형 대시보드", "카드 중심 레이아웃과 명확한 결과 요약"],
              ["한국 통화 포맷", "모든 금액을 ₩와 천 단위 구분으로 표시"],
              ["성장 차트 지원", "투자 계산기와 적금 계산기에 추이 차트 제공"],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur"
              >
                <h2 className="text-lg font-bold text-white">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-100/75">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:grid-cols-3 md:p-8">
        <div>
          <p className="text-sm font-semibold text-sky-700">대표 카테고리</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            한국 금융 계산기
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            빠른 추정부터 장기 시나리오 비교까지 한 화면에서 이어서 사용할 수
            있도록 구성했습니다.
          </p>
        </div>
        {[
          ["투자", "복리, ETF, 배당, 물타기"],
          ["생활 금융", "연봉, 대출, 적금, 환율"],
          ["은퇴 계획", "FIRE, 연금, 은퇴 준비"],
        ].map(([title, body]) => (
          <div key={title} className="rounded-[1.5rem] bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              전체 계산기
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              모바일과 데스크톱 모두에서 읽기 쉬운 카드형 UI로 구성했습니다.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">
            총 {calculators.length}개의 계산기 제공
          </p>
        </div>
        <nav className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="group rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_28px_70px_rgba(3,105,161,0.14)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 transition group-hover:bg-sky-100 group-hover:text-sky-700">
                  <Icon name={calculator.icon} className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 transition group-hover:bg-sky-100 group-hover:text-sky-700">
                  바로가기
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-950">
                {calculator.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {calculator.description}
              </p>
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}
