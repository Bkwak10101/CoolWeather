import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherMappingService} from './weather-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherClientService {
  private url: any;
  private data: any;

  constructor(private httpClient: HttpClient, private weatherMappingService: WeatherMappingService) {
    this.url = "https://api.open-meteo.com/v1/forecast?latitude=50.06&longitude=19.94&hourly=temperature_2m&daily=weathercode&timezone=auto";
    this.data = this.httpClient.get(this.url);
  }

  getData() {
    return this.httpClient.get(this.url);
  }

  getSpecificTemperature(dates: Date[], data: any[], selectedDay: any, selectedTime: number) {
    let index = 0;
    let day;
    if (selectedDay.getDate() > new Date().getDate()) {
      day = new Date().getHours() + 24 * (selectedDay.getDate() - new Date().getDate());
    } else {
      day = new Date().getHours() + 24 * (new Date().getDate() - selectedDay.getDate());
    }
    for (const date in dates) {
      if (date == day.toString()) {
        return data[index];
      }
      index++;
    }
    return data[index];
  }

  getCurrentTemperature(dates: Date[], data: any[]) {
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

  getTemperature(dates: Date[], data: any[], hoursDelay: number) {
    const currentTime = new Date().getHours() + hoursDelay;
    let index = 0;

    for (const date in dates) {
      if (date == currentTime.toString()) {
        return data[index];
      }
      index++;
    }
    return data[index];
  }

  getSpecificWeather(dates: string[], code: number[], selectedDay: Date) {
    const targetDate = selectedDay.getDate();

    for (let i = 0; i < dates.length; i++) {
      const formattedDate = this.formatDate(dates[i]);
      if (formattedDate === targetDate) {
        return code[i];
      }
    }
    return null;
  }

  getDailyWeather(dates: string[], code: any[], dayOffset: number) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + dayOffset);
    const targetDate = currentDate.getDate();
    let index = 0;

    for (const date in dates) {
      const formattedDate = this.formatDate(dates[date]);
      if (formattedDate === targetDate) {
        return code[index];
      }
      index++;
    }
    return code;
  }

  formatDate(dateStr: string): number {
    const date = new Date(dateStr);
    return date.getDate();
  }
}

export interface ApiResponse {
  time: string[];
  temperature_2m: number[];
}
