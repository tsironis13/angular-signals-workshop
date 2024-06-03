import {Component, inject} from '@angular/core';
import {Currency} from './currency';
import {CurrencyService} from '../currency.service';

@Component({
  selector: 'app-currency-switcher',
  standalone: true,
  templateUrl: './currency-switcher.component.html',
  styleUrls: ['./currency-switcher.component.css']
})
export class CurrencySwitcherComponent {

  protected showItems = false;
  protected service = inject(CurrencyService);
  protected currencyInfo = this.service.getCurrencyInfo();

  changeCurrency(currency: Currency): void {
    this.service.setCurrency(currency);
    this.showItems = false;
  }
}
