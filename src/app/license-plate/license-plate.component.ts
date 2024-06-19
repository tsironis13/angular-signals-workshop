import { Component, Input, inject } from '@angular/core';
import { LicensePlate } from '../license-plate';
import { CurrencyService } from '../currency.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-license-plate',
  standalone: true,
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.css'],
  imports: [DecimalPipe],
})
export class LicensePlateComponent {
  @Input()
  plate!: LicensePlate;

  @Input()
  buttonText!: string;

  service = inject(CurrencyService);
}
