import type { SVGProps } from "react";

type IconName =
  | "home"
  | "investment"
  | "dividend"
  | "salary"
  | "loan"
  | "savings"
  | "fire"
  | "stock"
  | "etf"
  | "currency"
  | "pension"
  | "retirement";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

const paths: Record<IconName, string> = {
  home: "M4 11.5 12 4l8 7.5V20h-5v-5H9v5H4z",
  investment: "M4 18h16M7 14l3-3 3 2 5-6",
  dividend: "M12 4v16M7 9c0-2 1.8-3 4-3s4 1 4 3-1.8 3-4 3-4 1-4 3 1.8 3 4 3 4-1 4-3",
  salary: "M4 7h16v10H4zM8 7V5h8v2M7 12h10",
  loan: "M5 9 12 4l7 5v9H5zM9 20v-6h6v6",
  savings: "M6 6h12v4H6zM5 10h14l-1 9H6z",
  fire: "M12 4c2 3 4 4.5 4 7a4 4 0 1 1-8 0c0-1.8.8-3.5 4-7Zm0 9.5c1.4 1.2 2 2.1 2 3.3a2 2 0 1 1-4 0c0-1.2.6-2.1 2-3.3Z",
  stock: "M5 18h14M7 15V9M12 15V6M17 15v-4",
  etf: "M5 6h14v12H5zM8 10h8M8 14h5",
  currency: "M6 8h12M8 5c-1.2 1.5-2 4-2 7s.8 5.5 2 7M16 5c1.2 1.5 2 4 2 7s-.8 5.5-2 7M5 12h14",
  pension: "M6 18h12M8 18V9l4-3 4 3v9",
  retirement: "M5 19h14M7 19v-6l5-3 5 3v6M12 10V5",
};

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
