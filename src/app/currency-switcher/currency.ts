type CurrencyMapping = {
  USD: { abreviation: 'USD'; symbol: '$' };
  EUR: { abreviation: 'EUR'; symbol: '€' };
  GBP: { abreviation: 'GBP'; symbol: '£' };
};

export type CurrencyDetails<T extends keyof CurrencyMapping> = {
  abreviation: CurrencyMapping[T]['abreviation'];
  symbol: CurrencyMapping[T]['symbol'];
};

export const USD: CurrencyDetails<'USD'> = {
  abreviation: 'USD',
  symbol: '$',
};

export const EUR: CurrencyDetails<'EUR'> = {
  abreviation: 'EUR',
  symbol: '€',
};

export const GBP: CurrencyDetails<'GBP'> = {
  abreviation: 'GBP',
  symbol: '£',
};

export type Currency = typeof USD | typeof EUR | typeof GBP;

export type CurrencyInfo = {
  currency: Currency;
  exchangeRate: number;
};

export type ExchangeRates = Record<Currency['abreviation'], number>;
