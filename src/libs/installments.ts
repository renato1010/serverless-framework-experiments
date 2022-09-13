const round = (amountOfMoney: number): number => Math.round(amountOfMoney * 100) / 100;

export const monthlyPayment = (principal: number, annualInterestRate: number, payments: number = 12): number => {
  const interest = annualInterestRate / 100 / 12;
  const x = Math.pow(1 + interest, payments);
  const monthly = (principal * x * interest) / (x - 1);
  if (isNaN(monthly)) {
    throw new Error("Error calculating monthly payment");
  }
  return round(monthly);
};

