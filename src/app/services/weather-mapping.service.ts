import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherMappingService {

  private weatherMappings: { range: number[]; imagePath: string }[] = [
    { range: [0], imagePath: 'assets/images/sun.png' },
    { range: [1, 2, 3], imagePath: 'assets/images/clear-sky.png' },
    { range: Array.from({ length: 60 }, (_, i) => i + 4), imagePath: 'assets/images/rain.png' },
    { range: Array.from({ length: 7 }, (_, i) => i + 64), imagePath: 'assets/images/cloudy.png' },
    { range: Array.from({ length: 14 }, (_, i) => i + 71), imagePath: 'assets/images/cloudy.png' },
    { range: Array.from({ length: 2 }, (_, i) => i + 85), imagePath: 'assets/images/snow.png' },
    { range: Array.from({ length: 13 }, (_, i) => i + 87), imagePath: 'assets/images/storm.png' },
  ];

  constructor() {}

  getWeatherImage(weatherCode: any): string {
    const weatherMapping = this.weatherMappings.find(mapping => mapping.range.includes(weatherCode));
    return weatherMapping ? weatherMapping.imagePath : '';
  }
}
