import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherClientService {

  private url: any;
  private data: any;

  constructor(private httpClient: HttpClient) {
    this.url = "https://api.open-meteo.com/v1/forecast?latitude=50.06&longitude=19.94&hourly=temperature_2m";
    this.data = this.httpClient.get(this.url);
  }

  getData() {
    return this.httpClient.get(this.url);
  }

  getCurrentData(dates: Date[], data: any[]) {
    const currentTime = new Date().getHours();
    let index = 0;
    for (const date in dates) {
      if (date == currentTime.toString()) {
        return data[index];
      }
      index++;
    }
    return data[index];
  }

  getTomorrowData(dates: Date[], data: any[]) {
    const dayAfterTommorow = new Date().getHours() + 24;
    let index = 0;

    for (const date in dates) {
      if (date == dayAfterTommorow.toString()) {

        return data[index];
      }
      index++;
    }
    return data[index];

  }

  getDayAfterTomorrowData(dates: Date[], data: any[]) {
    const tomorrowTime = new Date().getHours() + 48;
    let index = 0;

    for (const date in dates) {
      if (date == tomorrowTime.toString()) {

        return data[index];
      }
      index++;
    }
    return data[index];
  }
}

export interface ApiResponse {
  time: string[];
  temperature_2m: number[];
}
