export const formatCurrency = (currency: string | null | undefined, amount: number): string => {
  if (!currency || currency.trim() === '' || currency.toUpperCase() === 'N/A') {
    return amount.toFixed(2);
  }
  return `${currency} ${amount.toFixed(2)}`;
};

