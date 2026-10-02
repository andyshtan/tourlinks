// Money as the ground operator quotes it: yen with the symbol, everything else with its code
export const formatMoney = (amount: number, currency: string): string =>
  currency === 'JPY' ? `¥${amount.toLocaleString()}` : `${currency} ${amount.toLocaleString()}`;
