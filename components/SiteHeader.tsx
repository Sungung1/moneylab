"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/lib/calculators";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-[rgba(248,250,252,0.82)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="text-lg font-black tracking-tight text-slate-950">
              머니랩 (MoneyLab) - 한국 금융 계산기
            </Link>
            <span className="w-fit rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              Financial Tools
            </span>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1">
            {navigationItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
