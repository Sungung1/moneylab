type ChartSeries = {
  labels: string[];
  values: number[];
};

function toSafeNumber(value: number, minimum = 0) {
  if (!Number.isFinite(value)) {
    return minimum;
  }

  return Math.max(value, minimum);
}

function toSafeInteger(value: number, minimum = 0) {
  return Math.max(Math.trunc(toSafeNumber(value, minimum)), minimum);
}

export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
) {
  const safePrincipal = toSafeNumber(principal);
  const safeMonthlyContribution = toSafeNumber(monthlyContribution);
  const safeAnnualRate = toSafeNumber(annualRate);
  const safeYears = toSafeInteger(years);
  const monthlyRate = safeAnnualRate / 100 / 12;
  const totalMonths = safeYears * 12;
  let balance = safePrincipal;
  const labels = ["시작"];
  const values = [Math.round(balance)];

  for (let month = 1; month <= totalMonths; month += 1) {
    balance = monthlyRate === 0
      ? balance + safeMonthlyContribution
      : balance * (1 + monthlyRate) + safeMonthlyContribution;

    if (month % 12 === 0) {
      labels.push(`${month / 12}년`);
      values.push(Math.round(balance));
    }
  }

  const totalContribution = safePrincipal + safeMonthlyContribution * totalMonths;

  return {
    totalInvestment: totalContribution,
    totalProfit: balance - totalContribution,
    finalAmount: balance,
    chart: { labels, values } satisfies ChartSeries,
  };
}

export function calculateSavings(
  monthlyDeposit: number,
  annualRate: number,
  years: number,
  taxRate: number,
) {
  const safeMonthlyDeposit = toSafeNumber(monthlyDeposit);
  const safeAnnualRate = toSafeNumber(annualRate);
  const safeYears = toSafeInteger(years);
  const safeTaxRate = toSafeNumber(taxRate);
  const monthlyRate = safeAnnualRate / 100 / 12;
  const months = safeYears * 12;
  let balance = 0;
  const labels = ["시작"];
  const values = [0];

  for (let month = 1; month <= months; month += 1) {
    balance = (balance + safeMonthlyDeposit) * (1 + monthlyRate);

    if (month % 12 === 0) {
      labels.push(`${month / 12}년`);
      values.push(Math.round(balance));
    }
  }

  const totalInvestment = safeMonthlyDeposit * months;
  const totalProfit = balance - totalInvestment;
  const finalAmount = totalInvestment + totalProfit * (1 - safeTaxRate / 100);

  return {
    totalInvestment,
    totalProfit,
    finalAmount,
    preTaxAmount: balance,
    chart: { labels, values } satisfies ChartSeries,
  };
}

export function calculateDividend(
  investment: number,
  dividendYield: number,
  growthRate: number,
  years: number,
) {
  const safeInvestment = toSafeNumber(investment);
  const safeDividendYield = toSafeNumber(dividendYield);
  const safeGrowthRate = Number.isFinite(growthRate) ? growthRate : 0;
  const safeYears = toSafeInteger(years);
  const annualDividend = safeInvestment * (safeDividendYield / 100);
  const futureDividend =
    annualDividend * Math.pow(1 + safeGrowthRate / 100, safeYears);
  const cumulativeDividend =
    safeGrowthRate === 0
      ? annualDividend * safeYears
      : annualDividend *
        ((Math.pow(1 + safeGrowthRate / 100, safeYears) - 1) /
          (safeGrowthRate / 100));

  return {
    totalInvestment: safeInvestment,
    totalProfit: cumulativeDividend,
    finalAmount: safeInvestment + cumulativeDividend,
    annualDividend,
    monthlyDividend: annualDividend / 12,
    futureDividend,
  };
}

function calculateIncomeTax(taxableAnnualIncome: number) {
  const safeTaxableAnnualIncome = toSafeNumber(taxableAnnualIncome);
  const brackets = [
    { limit: 14_000_000, rate: 0.06, deduction: 0 },
    { limit: 50_000_000, rate: 0.15, deduction: 1_260_000 },
    { limit: 88_000_000, rate: 0.24, deduction: 5_760_000 },
    { limit: 150_000_000, rate: 0.35, deduction: 15_440_000 },
    { limit: 300_000_000, rate: 0.38, deduction: 19_940_000 },
    { limit: 500_000_000, rate: 0.4, deduction: 25_940_000 },
    { limit: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.45, deduction: 65_940_000 },
  ];

  const bracket =
    brackets.find((item) => safeTaxableAnnualIncome <= item.limit) ?? brackets[0];

  return Math.max(
    safeTaxableAnnualIncome * bracket.rate - bracket.deduction,
    0,
  );
}

function calculateEarnedIncomeDeduction(totalSalary: number) {
  const safeTotalSalary = toSafeNumber(totalSalary);

  if (safeTotalSalary <= 5_000_000) return safeTotalSalary * 0.7;
  if (safeTotalSalary <= 15_000_000) {
    return 3_500_000 + (safeTotalSalary - 5_000_000) * 0.4;
  }
  if (safeTotalSalary <= 45_000_000) {
    return 7_500_000 + (safeTotalSalary - 15_000_000) * 0.15;
  }
  if (safeTotalSalary <= 100_000_000) {
    return 12_000_000 + (safeTotalSalary - 45_000_000) * 0.05;
  }

  return 14_750_000 + (safeTotalSalary - 100_000_000) * 0.02;
}

export function calculateSalary(
  annualSalary: number,
  annualBonus: number,
  nonTaxableMonthly: number,
) {
  const safeAnnualSalary = toSafeNumber(annualSalary);
  const safeAnnualBonus = toSafeNumber(annualBonus);
  const safeNonTaxableMonthly = toSafeNumber(nonTaxableMonthly);
  const annualGross = safeAnnualSalary + safeAnnualBonus;
  const pension = annualGross * 0.045;
  const health = annualGross * 0.03545;
  const longTermCare = health * 0.1295;
  const employment = annualGross * 0.009;
  const earnedIncomeDeduction = calculateEarnedIncomeDeduction(annualGross);
  const taxableIncome = Math.max(
    annualGross - earnedIncomeDeduction - safeNonTaxableMonthly * 12,
    0,
  );
  const incomeTax = calculateIncomeTax(taxableIncome);
  const localIncomeTax = incomeTax * 0.1;
  const annualDeductions =
    pension + health + longTermCare + employment + incomeTax + localIncomeTax;
  const annualNet = annualGross - annualDeductions;
  const monthlyNet = annualNet / 12 + safeNonTaxableMonthly;

  return {
    totalInvestment: annualGross,
    totalProfit: annualNet,
    finalAmount: monthlyNet,
    annualNet,
    annualDeductions,
    pension,
    health: health + longTermCare,
    tax: incomeTax + localIncomeTax,
  };
}

export function calculateLoan(principal: number, annualRate: number, years: number) {
  const safePrincipal = toSafeNumber(principal);
  const safeAnnualRate = toSafeNumber(annualRate);
  const safeYears = Math.max(toSafeInteger(years), 1);
  const monthlyRate = safeAnnualRate / 100 / 12;
  const totalMonths = safeYears * 12;
  const monthlyPayment =
    monthlyRate === 0
      ? safePrincipal / totalMonths
      : safePrincipal *
        (monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths)));
  const totalPayment = monthlyPayment * totalMonths;

  return {
    totalInvestment: safePrincipal,
    totalProfit: totalPayment - safePrincipal,
    finalAmount: totalPayment,
    monthlyPayment,
  };
}

export function calculateFire(
  annualSpending: number,
  currentAssets: number,
  annualSavings: number,
  annualReturn: number,
  withdrawalRate: number,
) {
  const safeAnnualSpending = toSafeNumber(annualSpending);
  const safeCurrentAssets = toSafeNumber(currentAssets);
  const safeAnnualSavings = toSafeNumber(annualSavings);
  const safeAnnualReturn = toSafeNumber(annualReturn);
  const safeWithdrawalRate = toSafeNumber(withdrawalRate);
  const targetAssets =
    safeWithdrawalRate > 0 ? safeAnnualSpending / (safeWithdrawalRate / 100) : 0;
  let assets = safeCurrentAssets;
  let years = 0;

  while (assets < targetAssets && years < 100) {
    assets = assets * (1 + safeAnnualReturn / 100) + safeAnnualSavings;
    years += 1;
  }

  return {
    totalInvestment: safeCurrentAssets + safeAnnualSavings * years,
    totalProfit: assets - (safeCurrentAssets + safeAnnualSavings * years),
    finalAmount: assets,
    targetAssets,
    years,
  };
}

export function calculateStockAverage(
  currentShares: number,
  currentAveragePrice: number,
  additionalShares: number,
  additionalPrice: number,
) {
  const safeCurrentShares = toSafeNumber(currentShares);
  const safeCurrentAveragePrice = toSafeNumber(currentAveragePrice);
  const safeAdditionalShares = toSafeNumber(additionalShares);
  const safeAdditionalPrice = toSafeNumber(additionalPrice);
  const totalShares = safeCurrentShares + safeAdditionalShares;
  const totalCost =
    safeCurrentShares * safeCurrentAveragePrice +
    safeAdditionalShares * safeAdditionalPrice;
  const averagePrice = totalShares > 0 ? totalCost / totalShares : 0;

  return {
    totalInvestment: totalCost,
    totalProfit: safeAdditionalPrice - averagePrice,
    finalAmount: averagePrice,
    totalShares,
  };
}

export function calculateEtfReturn(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
  expenseRatio: number,
) {
  const safeAnnualRate = Number.isFinite(annualRate) ? annualRate : 0;
  const safeExpenseRatio = toSafeNumber(expenseRatio);
  const netAnnualRate = safeAnnualRate - safeExpenseRatio;

  return calculateCompoundInterest(
    principal,
    monthlyContribution,
    netAnnualRate,
    years,
  );
}

export function calculateCurrency(
  amount: number,
  exchangeRate: number,
  feeRate: number,
) {
  const safeAmount = toSafeNumber(amount);
  const safeExchangeRate = toSafeNumber(exchangeRate);
  const safeFeeRate = toSafeNumber(feeRate);
  const converted = safeAmount * safeExchangeRate;
  const fee = converted * (safeFeeRate / 100);

  return {
    totalInvestment: safeAmount,
    totalProfit: fee,
    finalAmount: converted - fee,
    converted,
  };
}

export function calculatePension(
  currentAge: number,
  retirementAge: number,
  monthlyContribution: number,
  annualReturn: number,
) {
  const safeCurrentAge = toSafeInteger(currentAge);
  const safeRetirementAge = toSafeInteger(retirementAge);
  const years = Math.max(safeRetirementAge - safeCurrentAge, 0);
  const result = calculateCompoundInterest(
    0,
    monthlyContribution,
    annualReturn,
    years,
  );

  return {
    ...result,
    years,
  };
}

export function calculateRetirement(
  currentAssets: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number,
  monthlyExpense: number,
) {
  const result = calculateCompoundInterest(
    currentAssets,
    monthlyContribution,
    annualReturn,
    years,
  );
  const targetAssets = toSafeNumber(monthlyExpense) * 12 * 25;

  return {
    ...result,
    targetAssets,
    gap: result.finalAmount - targetAssets,
  };
}
