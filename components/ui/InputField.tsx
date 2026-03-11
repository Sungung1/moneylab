"use client";

import { useState } from "react";

import {
  formatEditableNumber,
  getFractionDigits,
  parseFormattedNumber,
} from "@/utils/format";

type InputFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
  suffix?: string;
  description?: string;
};

export function InputField({
  label,
  value,
  onChange,
  min,
  step = 1,
  suffix,
  description,
}: InputFieldProps) {
  const fractionDigits = getFractionDigits(step);
  const allowNegative = min === undefined || min < 0;
  const [displayValue, setDisplayValue] = useState(
    formatEditableNumber(String(value), fractionDigits),
  );
  const [isFocused, setIsFocused] = useState(false);
  const renderedValue = isFocused
    ? displayValue
    : formatEditableNumber(String(value), fractionDigits);

  const handleChange = (input: string) => {
    let sanitized = input
      .replace(/,/g, "")
      .replace(/[^\d.-]/g, "")
      .replace(allowNegative ? /(?!^)-/g : /-/g, "");
    const decimalSegments = sanitized.split(".");

    sanitized = fractionDigits
      ? `${decimalSegments[0] ?? ""}${
          decimalSegments.length > 1
            ? `.${decimalSegments.slice(1).join("").slice(0, fractionDigits)}`
            : input.endsWith(".")
              ? "."
              : ""
        }`
      : sanitized.replace(/\./g, "");

    const [integerPart = "", ...decimalParts] = sanitized.split(".");
    const nextRawValue = fractionDigits
      ? `${integerPart}${
          decimalParts.length
            ? `.${decimalParts.join("").slice(0, fractionDigits)}`
            : sanitized.endsWith(".")
              ? "."
              : ""
        }`
      : integerPart;
    const parsedValue = parseFormattedNumber(nextRawValue);
    const clampedValue =
      min !== undefined ? Math.max(min, parsedValue) : parsedValue;

    setDisplayValue(formatEditableNumber(nextRawValue, fractionDigits));
    onChange(clampedValue);
  };

  return (
    <label className="block min-w-0 rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm transition focus-within:border-sky-300 focus-within:bg-white focus-within:shadow-[0_18px_40px_rgba(14,165,233,0.10)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold tracking-tight text-slate-700">
          {label}
        </span>
        {suffix ? (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-slate-500 uppercase">
            {suffix}
          </span>
        ) : null}
      </div>
      <input
        type="text"
        inputMode={fractionDigits > 0 ? "decimal" : "numeric"}
        pattern={fractionDigits > 0 ? "[0-9.,]*" : "[0-9,]*"}
        autoComplete="off"
        value={renderedValue}
        onFocus={() => {
          setDisplayValue(formatEditableNumber(String(value), fractionDigits));
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChange={(event) => handleChange(event.target.value)}
        aria-label={label}
        className="mt-3 block w-full min-w-0 whitespace-nowrap rounded-[1.15rem] border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-lg font-semibold tracking-tight text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
      />
      {description ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
      ) : null}
    </label>
  );
}
