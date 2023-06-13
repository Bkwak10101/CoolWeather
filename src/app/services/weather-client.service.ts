import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherClientService {
  constructor(private httpClient: HttpClient) {
  }

  public getForecast(base: string): Observable<Root> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=50.06&longitude=19.94&hourly=temperature_2m`
    return this.httpClient.get<Root>(url);
  }

  // public getCurrentWeather() Observable<number> {
  //   const url = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`;
  //   return this.httpClient.get(url).pipe(
  //     map((response: any) => response.rates[targetCurrency])
  //   );
  // }
}

export interface Units {
  time: string
  temperature_2m: string
}

export interface Forecast {
  time: Time
  temperature_2m: Temperature
}

export interface Time {

}

export interface Temperature {
  temperature_2m: number
}

export interface Root {

  latitude: string
  longitude: string
  generationtime_ms: string
  utc_offset_seconds: number
  timezone: string
  timezone_abbrevation: string
  elevation: number
  hourly_units: Units
  hourly: Forecast
}

