import { Component, inject } from '@angular/core';
import { Currency, EUR, GBP, USD } from './currency';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-switcher',
  standalone: true,
  templateUrl: './currency-switcher.component.html',
  styleUrls: ['./currency-switcher.component.css'],
})
export class CurrencySwitcherComponent {
  showItems = false;
  service = inject(CurrencyService);

  protected readonly USD = USD;
  protected readonly EYR = EUR;
  protected readonly GBP = GBP;

  changeCurrency(currency: Currency): void {
    // TODO Call CurrencyService to change the currency
    this.showItems = false;
    this.service.currency = currency;
  }
}
