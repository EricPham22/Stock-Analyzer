import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public stock;
  public interval;
  public indicator1;
  public indicator2;
  public indicator3;
  public timePeriod1;
  public timePeriod2;
  public timePeriod3;

  public intervalOptions = ['1 min', '5 min', '15 min', '30 min', '60 min', 'daily', 'weekly', 'monthly'];

  public indicatorValues = ['SMA', 'EMA', 'VWAP', 'RSI', 'MACD'];

  public periodValues = ['5', '10', '20', '30', '50', '100', '200', 'NotNeeded'];

  constructor(private sharedData: SharedDataService, private router: Router) {

  }

  onSubmit() {
    var indicatorArray: any[] = [this.indicator1, this.indicator2, this.indicator3];
    var timePeriodArray: any[] = [this.timePeriod1, this.timePeriod2, this.timePeriod3];
    this.sharedData.setData(this.stock, this.interval, indicatorArray, timePeriodArray);
    this.router.navigate(['/stockdetail', this.stock]);
  }


}
