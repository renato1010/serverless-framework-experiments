const formatNumber = (number: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
export const monthlyPayment = (
  principal: number,
  annualInterestRate: number,
  payments: number = 12
): string => {
  const interest = annualInterestRate / 100 / 12;
  const x = Math.pow(1 + interest, payments);
  const monthly = (principal * x * interest) / (x - 1);
  if (isNaN(monthly)) {
    throw new Error("Error calculating monthly payment");
  }
  return formatNumber(monthly);
};
