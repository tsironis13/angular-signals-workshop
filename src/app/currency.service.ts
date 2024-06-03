import {computed, Injectable, Signal, signal} from '@angular/core';
import {Currency} from './currency-switcher/currency';

export interface CurrencyInfo {
  currency: Currency;
  exchangeRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  // The current currency stored as a Signal
  private readonly currency = signal<Currency>('USD');

  // A signal that returns the current currency along with its latest exchange rate
  private readonly currencyInfo = computed<CurrencyInfo>(() => {
    return {currency: this.currency(), exchangeRate: 1};
  })

  getCurrencyInfo(): Signal<CurrencyInfo> {
    return this.currencyInfo;
  }

  // Public setter for components to update the current currency
  setCurrency(currency: Currency): void {
    this.currency.set(currency);
  }

  // TODO Handle exchange rates for each currency using the endpoint: https://lp-store-server.vercel.app/rates

}
