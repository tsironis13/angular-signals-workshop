import { Component, inject } from '@angular/core';
import { Currency } from './currency';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-switcher',
  standalone: true,
  templateUrl: './currency-switcher.component.html',
  styleUrls: ['./currency-switcher.component.css'],
})
export class CurrencySwitcherComponent {
  showItems = false;

  currencyService = inject(CurrencyService);

  changeCurrency(currency: Currency): void {
    // TODO Call CurrencyService to change the currency
    this.showItems = false;
    this.currencyService.currency.set(currency);
  }
}
