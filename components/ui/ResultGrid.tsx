import type { ReactNode } from "react";

type ResultGridProps = {
  children: ReactNode;
};

export function ResultGrid({ children }: ResultGridProps) {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      {children}
    </div>
  );
}
