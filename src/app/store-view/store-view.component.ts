import { Component, inject } from '@angular/core';
import { LicensePlateComponent } from '../license-plate/license-plate.component';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';
import { HttpClient } from '@angular/common/http';
import { LicensePlate } from '../license-plate';
import { AsyncPipe } from '@angular/common';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-store-view',
  standalone: true,
  imports: [LicensePlateComponent, JumbotronComponent, AsyncPipe],
  templateUrl: './store-view.component.html',
  styleUrl: './store-view.component.css',
})
export class StoreViewComponent {
  http = inject(HttpClient);
  currencyService = inject(CurrencyService);

  protected readonly currencyInfo = this.currencyService.currencyInfo;

  plates$ = this.http.get<LicensePlate[]>(
    'https://lp-store-server.vercel.app/data'
  );
}
