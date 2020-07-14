import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../services/fetch-data.service';
import { SharedDataService } from '../services/shared-data.service';
import { GlobalQuote, fp } from '../stockData';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  public QD: GlobalQuote;
  public fpMap: fp[] = [];
  public data;

  constructor(private service: FetchDataService, private sharedData: SharedDataService) {
    this.data = this.sharedData.getData();
  }

  ngOnInit() {
    this.getQuote(this.data.symbol.toString());
    this.populate();
  }

  populate() {
    var i;
    for (i = 0; i < this.data.indicators.length; i++) {
      this.fpMap.push(new fp(this.data.indicators[i], this.data.timePeriod[i], 'close', this.data.interval.toString(), this.data.symbol));
    }
  }



  getQuote(ticker: string) {
    this.service.getQuote(ticker).subscribe(data => {
      const tickerSymbol: string = data["Global Quote"]["01. symbol"];
      const currentPrice: string = data["Global Quote"]["05. price"];
      const openPrice: string = data["Global Quote"]["02. open"];
      const highPrice: string = data["Global Quote"]["03. high"];
      const lowPrice: string = data["Global Quote"]["04. low"];
      const volume: string = data["Global Quote"]["06. volume"];
      const priceChange: string = data["Global Quote"]["09. change"];
      const percentChange: string = data["Global Quote"]["10. change percent"];
      this.QD = new GlobalQuote(tickerSymbol, currentPrice, openPrice, priceChange, percentChange, highPrice, lowPrice, volume
      );
    });
  }


}
