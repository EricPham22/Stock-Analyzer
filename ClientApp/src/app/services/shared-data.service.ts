import { Injectable } from '@angular/core';
import { stockData, GlobalQuote } from '../stockData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public input: stockData;

  public QD: GlobalQuote;
  public IndicatorValues: any[] = [];
  public timeSeriesValues: any[] = [];

  setData(tickerSymbol: string, interval: string, indicators: any[], timePeriod: any[]) {
    this.input = new stockData(tickerSymbol, interval, indicators, timePeriod);
  }

  getData() {
    return this.input;
  }
}
