import { Injectable, Injector, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, catchError, retry, shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {


  protected URL: string;
  protected apiKey: string;

  constructor(private injector: Injector, private http: HttpClient) {
    this.URL = 'https://www.alphavantage.co/query?';
    this.apiKey = '&apikey=LQ0VZ8R35V4SZ7RY';

  }


  getQuote(ticker: string): Observable<any> {
    console.log(this.URL + 'function=GLOBAL_QUOTE&symbol=' + ticker + this.apiKey)
    return this.http.get(this.URL + 'function=GLOBAL_QUOTE&symbol=' + ticker + this.apiKey).pipe(
      retry(3),
      catchError(() => {
        console.log("nani");
        return null;
      }),
      shareReplay()
    );

  }

  getIndicator(func, symbol, interval: string, time_period, series_type) {
    console.log(this.URL + 'function=' + func + '&symbol=' + symbol + '&interval=' + interval + '&time_period=' + time_period + '&series_type=' + series_type + this.apiKey);
    return this.http.get(this.URL + 'function=' + func + '&symbol=' + symbol + '&interval=' + interval + '&time_period=' + time_period + '&series_type=' + series_type + this.apiKey).pipe(
      retry(3),
      catchError(() => {
        console.log("nani");
        return null;
      }),
      shareReplay()
    );
  }

  getTimeSeriesIntra(symbol, interval) {
    console.log(this.URL + 'function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=' + interval + this.apiKey);
    return this.http.get(this.URL + 'function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=' + interval + this.apiKey).pipe(
      retry(3),
      catchError(() => {
        console.log("nani");
        return null;
      }),
      shareReplay()
    );

  }

  getTimeSeries(symbol, interval) {
    console.log(this.URL + 'function=TIME_SERIES_' + interval.toUpperCase() + '&symbol=' + symbol + this.apiKey);
    return this.http.get(this.URL + 'function=TIME_SERIES_' + interval.toUpperCase() + '&symbol=' + symbol + this.apiKey).pipe(
      retry(3),
      catchError(() => {
        console.log("nani");
        return null;
      }),
      shareReplay()
    );

  }

  getVWAP(func, symbol, interval: string) {
    console.log(this.URL + 'function=' + func + '&symbol=' + symbol + '&interval=' + interval + this.apiKey);
    return this.http.get(this.URL + 'function=' + func + '&symbol=' + symbol + '&interval=' + interval + this.apiKey).pipe(
      retry(3),
      catchError(() => {
        return null;
      }),
      shareReplay()
    );
  }

  getMACD(func, symbol, interval, series_type) {
    console.log(this.URL + 'function=' + func + '&symbol=' + symbol + '&interval=' + interval + '&series_type=' + series_type + this.apiKey);
    return this.http.get(this.URL + 'function=' + func + '&symbol=' + symbol + '&interval=' + interval + '&series_type=' + series_type + this.apiKey).pipe(
      retry(3),
      catchError(() => {
        console.log("nani");
        return null;
      }),
      shareReplay()
    );
  }

  getRSI(func, symbol, interval, time_period, series_type) {
    console.log(this.URL + 'function=' + func + '&symbol=' + symbol + '&interval=' + interval + '&time_period=' + time_period + '&series_type=' + series_type + this.apiKey);
    return this.http.get(this.URL + 'function=' + func + '&symbol=' + symbol + '&interval=' + interval + '&time_period=' + time_period + '&series_type=' + series_type + this.apiKey).pipe(
      retry(3),
      catchError(() => {
        console.log("nani");
        return null;
      }),
      shareReplay()
    );
  }


}
