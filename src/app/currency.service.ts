import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {Currency} from './currency-switcher/currency';
import {toSignal} from '@angular/core/rxjs-interop';
import {HttpClient} from '@angular/common/http';

export interface CurrencyInfo {
  currency: Currency;
  exchangeRate: number;
}

export type ExchangeRates = Record<Currency, number>;

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  // The current currency stored as a Signal
  private readonly currency = signal<Currency>('USD');

  // A signal that returns the current currency along with its latest exchange rate
  private readonly currencyInfo = computed<CurrencyInfo>(() => {
    const rateForCurrency = this.exchangeRates()[this.currency()];
    return {currency: this.currency(), exchangeRate: rateForCurrency};
  })

  private http = inject(HttpClient);
  // We convert our HTTP request (Observable) into a Signal using toSignal()
  private exchangeRates = toSignal(
    this.http.get<ExchangeRates>("https://lp-store-server.vercel.app/rates"),
    // We pass a default meaningful value to use while the data is being loaded
    {initialValue: {USD: 1, GBP: 1, EUR: 1}}
  );

  getCurrencyInfo(): Signal<CurrencyInfo> {
    return this.currencyInfo;
  }

  // Public setter for components to update the current currency
  setCurrency(currency: Currency): void {
    this.currency.set(currency);
  }
}
