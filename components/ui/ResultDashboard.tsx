import type { ReactNode } from "react";

type ResultDashboardProps = {
  children: ReactNode;
};

export function ResultDashboard({ children }: ResultDashboardProps) {
  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl space-y-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] md:p-8">
      {children}
    </div>
  );
}
