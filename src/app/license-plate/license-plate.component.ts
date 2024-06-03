import {Component, inject, Input} from '@angular/core';
import {LicensePlate} from '../license-plate';
import {CurrencyService} from '../currency.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-license-plate',
  standalone: true,
  templateUrl: './license-plate.component.html',
  imports: [
    CurrencyPipe
  ],
  styleUrls: ['./license-plate.component.css']
})
export class LicensePlateComponent {

  @Input()
  plate!: LicensePlate;

  @Input()
  buttonText!: string;

  protected currencyInfo = inject(CurrencyService).getCurrencyInfo();

}
