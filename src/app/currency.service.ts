import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  Currency,
  CurrencyInfo,
  ExchangeRates,
  USD,
} from './currency-switcher/currency';
import { HttpClient } from '@angular/common/http';
import { of, retry, share, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private pollingInterval = 30000;
  private currencySignal = signal<Currency>(USD);

  private http = inject(HttpClient);

  private exchangeRatesSignal = toSignal(this.fetchExchangeRates());

  currencyInfo = computed<CurrencyInfo | null>(() => {
    const rates = this.exchangeRatesSignal();

    return rates
      ? {
          currency: this.currencySignal(),
          exchangeRate: rates[this.currencySignal().abreviation],
        }
      : null;
  });

  set currency(cur: Currency) {
    this.currencySignal.set(cur);
  }

  getCurrency() {
    return this.currencySignal.asReadonly();
  }

  fetchExchangeRates() {
    return timer(1, this.pollingInterval).pipe(
      switchMap(() =>
        this.http.get<ExchangeRates>('https://lp-store-server.vercel.app/rates')
      ),
      retry(),
      share(),
      takeUntilDestroyed()
    );
  }

  // TODO Implement a way to store the current currency as a Signal
  // TODO Expose your Currency Signal in a read-only manner
  // TODO Expose a public setter for components to update the current currency
  // TODO Handle exchange rates for each currency using the endpoint: https://lp-store-server.vercel.app/rates
}
