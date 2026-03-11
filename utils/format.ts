export function formatCurrency(value: number) {
  const safeValue = Number.isFinite(value) ? Math.round(value) : 0;
  const sign = safeValue < 0 ? "-" : "";

  return `${sign}₩${Math.abs(safeValue).toLocaleString("ko-KR")}`;
}

export function formatKoreanNumber(value: number) {
  return formatKoreanCurrency(value);
}

export function formatKoreanCurrency(value: number) {
  const safeValue = Number.isFinite(value) ? Math.round(value) : 0;
  const sign = safeValue < 0 ? "-" : "";
  const absoluteValue = Math.abs(safeValue);

  if (absoluteValue >= 1_000_000_000_000) {
    return `${sign}${formatLargeKoreanUnit(absoluteValue / 1_000_000_000_000)}조`;
  }

  if (absoluteValue >= 100_000_000) {
    return `${sign}${formatLargeKoreanUnit(absoluteValue / 100_000_000)}억`;
  }

  if (absoluteValue >= 10_000) {
    return `${sign}${formatNumber(Math.round(absoluteValue / 10_000))}만`;
  }

  return `${sign}${absoluteValue.toLocaleString("ko-KR")}`;
}

export function formatNumber(value: number, digits = 0) {
  const safeValue = Number.isFinite(value) ? value : 0;

  return safeValue.toLocaleString("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

export function formatPercent(value: number, digits = 1) {
  return `${formatNumber(value, digits)}%`;
}

export function getFractionDigits(step = 1) {
  const stepString = String(step);
  const decimalIndex = stepString.indexOf(".");

  return decimalIndex >= 0 ? stepString.length - decimalIndex - 1 : 0;
}

export function parseFormattedNumber(value: string) {
  const sanitized = value
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "")
    .replace(/(?!^)-/g, "");

  const [integerPart = "", ...decimalParts] = sanitized.split(".");
  const normalized = decimalParts.length
    ? `${integerPart}.${decimalParts.join("")}`
    : integerPart;
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatEditableNumber(value: string, digits = 0) {
  const sanitized = value.replace(/,/g, "").trim();

  if (!sanitized) {
    return "";
  }

  const isNegative = sanitized.startsWith("-");
  const unsignedValue = isNegative ? sanitized.slice(1) : sanitized;
  const [integerPart = "", decimalPart] = unsignedValue.split(".");
  const formattedInteger = integerPart
    ? formatNumber(Number(integerPart), 0)
    : "0";
  const prefix = isNegative ? "-" : "";

  if (decimalPart !== undefined && digits > 0) {
    return `${prefix}${formattedInteger}.${decimalPart.slice(0, digits || undefined)}`;
  }

  return `${prefix}${formattedInteger}`;
}

function formatLargeKoreanUnit(value: number) {
  const digits = value >= 10 ? 1 : 2;

  return formatNumber(value, digits);
}
