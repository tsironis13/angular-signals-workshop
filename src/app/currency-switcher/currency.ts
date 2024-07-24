export type Currency = 'USD' | 'EUR' | 'GBP';

export type ExchangeRates = Record<Currency, number>;

export type CurrencyInfo = {
  currency: Currency;
  exchangeRate: number;
};
