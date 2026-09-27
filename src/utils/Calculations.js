export function calculateHolding(holding) {

  const investedValue = holding.shares * holding.buyPrice;
  const currentValue = holding.shares * holding.currentPrice;
  const profitLoss = currentValue - investedValue;
  const returnPercentage = investedValue === 0 ? 0 : (profitLoss / investedValue) * 100;

  return {
    ...holding,
    investedValue,
    currentValue,
    profitLoss,
    returnPercentage,
  };
}

export function calculatePortfolioTotals(holdings) {
  let totalInvested = 0;
  let totalCurrentValue = 0;

  holdings.forEach((holding) => {
    totalInvested += holding.investedValue;
    totalCurrentValue += holding.currentValue;
  });

  const totalProfitLoss =
    totalCurrentValue - totalInvested;

  const totalReturnPercentage =
    totalInvested === 0
      ? 0
      : (totalProfitLoss / totalInvested) * 100;

  return {
    totalInvested,
    totalCurrentValue,
    totalProfitLoss,
    totalReturnPercentage,
  };
}

export function calculateAllocation( holding,totalCurrentValue) {
  if (totalCurrentValue === 0) {
    return 0; 
  }

  return (
    (holding.currentValue / totalCurrentValue) *
    100
  );
}