import { Component, OnInit, Input } from '@angular/core';
import { FetchDataService } from '../services/fetch-data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {

  @Input() public func;
  @Input() public ticker;
  @Input() public time: string;
  @Input() public period;
  @Input() public series;
  @Input() public price;


  public IndicatorValues: any[] = [];
  public IndicatorData;
  public currentValue;
  public bsh;

  constructor(private service: FetchDataService) { }

  ngOnInit() {
    this.getIndicatorSeries(this.func, this.ticker, this.time.replace(/ /g, ""), this.period, this.series);
  }

  getIndicatorSeries(func, ticker, time, period, series) {
    console.log(period);
    if (func === 'SMA' || func === 'EMA') {
      return this.service.getIndicator(func, ticker, time, period, series).subscribe(data => {
        var temp = 'Technical Analysis: ' + func;
        var IndicatorData = data[temp];
        var i = 0;
        for (const item in IndicatorData) {
          if (i < parseInt(period)) {
            this.IndicatorValues.push(IndicatorData[item][func]);
            i++;
          }
          else {
            break;
          }
        }
        this.currentValue = this.IndicatorValues[0];
        this.bsh = this.getState(0,this.currentValue, this.price, func);
      })
    }
    else if (func === 'VWAP') {
      return this.service.getVWAP(func, ticker, time).subscribe(data => {
        var temp = 'Technical Analysis: ' + func;
        var IndicatorData = data[temp];
        var i = 0;
        for (const item in IndicatorData) {
          if (i < 1) {
            this.IndicatorValues.push(IndicatorData[item][func]);
            i++;
          }
          else {
            break;
          }
        }
        this.currentValue = this.IndicatorValues[0];
        this.bsh = this.getState(0,this.currentValue, this.price, func);
      })
    }
    else if (func === 'RSI') {
      return this.service.getRSI(func, ticker, time, period, series).subscribe(data => {
        var temp = 'Technical Analysis: ' + func;
        var IndicatorData = data[temp];
        var i = 0;
        for (const item in IndicatorData) {
          if (i < parseInt(period)) {
            this.IndicatorValues.push(IndicatorData[item][func]);
            i++;
          }
          else {
            break;
          }
        }
        this.currentValue = this.IndicatorValues[0];
        this.bsh = this.getState(0,this.currentValue, this.price, func);
      })
    }
    else if (func === 'MACD') {
      return this.service.getMACD(func, ticker, time, series).subscribe(data => {
        var temp = 'Technical Analysis: ' + func;
        var IndicatorData = data[temp];
        var i = 0;
        for (const item in IndicatorData) {
          if (i < 1) {
            this.IndicatorValues.push(IndicatorData[item][func]);
            this.IndicatorValues.push(IndicatorData[item][func + '_Signal']);
            this.IndicatorValues.push(IndicatorData[item][func + '_Hist']);
            i++;
          }
          else {
            break;
          }
        }
        this.currentValue = this.IndicatorValues[2];
        this.bsh = this.getState(this.IndicatorValues[2],this.IndicatorValues[1], this.IndicatorValues[0], func);
      })
}
  }

 
  getState(macd, current, price, func) {
    if (func === 'EMA' || func === 'SMA') {
      return (current < price ? 'Buy' : (current > price) ? 'Sell' : 'Hold');
    }
    else if (func === 'VWAP') {
      return (current > price ? 'Buy' : (current < price) ? 'Sell' : 'Hold');
    }
    else if (func === 'RSI') {
      return (current < 30 ? 'Buy' : (current > 70) ? 'Sell' : 'Hold');
    }
    else if (func === 'MACD') {
      var plus : number = parseFloat(current) + 0.1;
      var minus : number = current - 0.1;
      return (price >= minus && price <= plus && macd < 0) ? 'Strong Buy' : (price >= minus && price <= plus && macd > 0) ? ' Strong Sell' : (macd > 0.3) ? 'Buy' : (macd < 0.3) ? 'Sell' : 'Hold';
    }
  }
}
