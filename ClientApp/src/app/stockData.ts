export class stockData
{
  constructor(
    public symbol: String,
    public interval: String,
    public indicators: any[],
    public timePeriod: any[]
  ) { }

}

export class GlobalQuote
{
  constructor(
    public symbol: String,
    public price: String,
    public open: String,
    public priceChange: String,
    public percentChange: String,
    public high: String,
    public low: String,
    public volume: String

  ) { }
}

export class fp
{
  constructor(
    public indicator,
    public timePeriod,
    public series_type,
    public interval,
    public ticker) { }
}


export class candlestickData
{
  constructor(
    public data: string,
    public open: string,
    public high: string,
    public low: string,
    public close: string
  ) { }
}
