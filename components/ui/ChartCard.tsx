"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { formatCurrency } from "@/utils/format";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

type ChartCardProps = {
  title: string;
  description: string;
  labels: string[];
  values: number[];
};

export function ChartCard({
  title,
  description,
  labels,
  values,
}: ChartCardProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        <p className="text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <div className="mt-5 h-[320px]">
        <Line
          data={{
            labels,
            datasets: [
              {
                label: title,
                data: values,
                borderColor: "#0f766e",
                backgroundColor: "rgba(15, 118, 110, 0.16)",
                pointBackgroundColor: "#0369a1",
                pointBorderColor: "#ffffff",
                pointRadius: 3,
                fill: true,
                tension: 0.32,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            interaction: {
              intersect: false,
              mode: "index",
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label(context) {
                    return formatCurrency(Number(context.raw));
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                ticks: {
                  callback(value) {
                    return formatCurrency(Number(value));
                  },
                },
              },
            },
          }}
        />
      </div>
    </section>
  );
}
