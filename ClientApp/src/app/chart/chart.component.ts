import { Component, OnInit, Input } from '@angular/core';
import { FetchDataService } from '../services/fetch-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  @Input() public ticker: string;
  @Input() public interval: string;

  public dataValue: any[] = [];
  public dataName: any[] = [];

  constructor(private fetchData: FetchDataService) {
  }

  ngOnInit() {
    console.log(this.interval);
    if (this.interval == 'daily') {
      this.timeSeries(this.ticker, this.interval);
    }
    else if (this.interval == 'monthly' || this.interval == 'weekly') {
      this.timeSeriesWM(this.ticker, this.interval);
    }
    else {
      this.timeSeriesIntra(this.ticker, this.interval.replace(/ /g, ""));
    }
  }

  public chartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    }
  };
  public chartData: any[] = [{data: [] , label:''}];
  public chartLabels = [];

  timeSeries(ticker, interval) {
    return this.fetchData.getTimeSeries(ticker, interval).subscribe(data => {
      var temp = 'Time Series (' + interval.charAt(0).toUpperCase() + interval.slice(1) + ')';
      var timeSeriesData = data[temp];
      console.log(data[temp]);
      var i = 0;
      for (const item in timeSeriesData) {
        if (i < 30) {
          this.dataValue.push(timeSeriesData[item]["4. close"]);
          this.dataName.push(item);
          i++;
        }
        else {
          break;
        }
      }
      this.chartData = [{ data: this.dataValue.reverse(), label: this.ticker }];
      this.chartLabels = this.dataName.reverse();
    });
  }

  timeSeriesWM(ticker, interval) {
    return this.fetchData.getTimeSeries(ticker, interval).subscribe(data => {
      var temp = interval.charAt(0).toUpperCase() + interval.slice(1) + ' Time Series';
      var timeSeriesData = data[temp];
      console.log(temp);
      var i = 0;
      for (const item in timeSeriesData) {
        if (i < 30) {
          this.dataValue.push(timeSeriesData[item]["4. close"]);
          this.dataName.push(item);
          i++;
        }
        else {
          break;
        }
      }
      this.chartData = [{ data: this.dataValue.reverse(), label: this.ticker }];
      this.chartLabels = this.dataName.reverse();
    });
  }

  timeSeriesIntra(ticker, interval) {
    return this.fetchData.getTimeSeriesIntra(ticker, interval).subscribe(data => {
    var temp = 'Time Series (' + interval.toLowerCase() + ')';
    var timeSeriesData = data[temp];
    var i = 0;
      for (const item in timeSeriesData) {
      if (i < 30) {
        this.dataValue.push(timeSeriesData[item]["4. close"]);
        this.dataName.push(item);
        i++;
      }
      else {
        break;
      }
      }
      this.chartData = [{ data: this.dataValue.reverse(), label: this.ticker }];
      this.chartLabels = this.dataName.reverse();
  });
  }


}
