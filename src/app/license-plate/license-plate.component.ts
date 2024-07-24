import { Component, input } from '@angular/core';
import { LicensePlate } from '../license-plate';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CurrencyInfo } from '../currency-switcher/currency';

@Component({
  selector: 'app-license-plate',
  standalone: true,
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.css'],
  imports: [DecimalPipe, CurrencyPipe],
})
export class LicensePlateComponent {
  plate = input.required<LicensePlate>();
  buttonText = input.required<string>();
  currencyInfo = input.required<CurrencyInfo>();
}
