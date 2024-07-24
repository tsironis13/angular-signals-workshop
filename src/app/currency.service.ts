import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  Currency,
  CurrencyInfo,
  ExchangeRates,
} from './currency-switcher/currency';
import { HttpClient } from '@angular/common/http';
import { retry, share, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  readonly #pollingInterval = 30000;
  readonly #exchangeRates = toSignal(this.fetchExchangeRates(), {
    initialValue: { USD: 1, EUR: 1, GBP: 1 },
  });

  private http = inject(HttpClient);

  readonly currency = signal<Currency>('USD');
  readonly currencyInfo = computed<CurrencyInfo>(() => {
    return {
      currency: this.currency(),
      exchangeRate: this.#exchangeRates()[this.currency()],
    };
  });

  fetchExchangeRates() {
    return timer(1, this.#pollingInterval).pipe(
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
