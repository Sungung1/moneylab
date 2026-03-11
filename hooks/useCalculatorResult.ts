"use client";

import { startTransition, useEffect, useEffectEvent, useState } from "react";

export function useCalculatorResult<T>(
  calculate: () => T,
  dependencies: readonly unknown[],
) {
  const [result, setResult] = useState<T>(() => calculate());
  const runCalculation = useEffectEvent(() => {
    startTransition(() => {
      setResult(calculate());
    });
  });

  useEffect(() => {
    runCalculation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const recalculate = () => {
    setResult(calculate());
  };

  return { result, recalculate };
}
