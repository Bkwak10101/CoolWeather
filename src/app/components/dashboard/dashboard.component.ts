import {Component, OnInit} from '@angular/core';
import {WeatherClientService} from "../../services/weather-client.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  forecast: Record<string, any> = {};

  weatherMappings: { range: number[]; imagePath: string }[] = [];

  constructor(private weatherClientService: WeatherClientService) {
  }

  ngOnInit(): void {
    this.data = this.weatherClientService
      .getData()
      .subscribe((data) => {
        this.data = data

        let times: any = this.data['hourly']['time'];
        let temperatures: any = this.data['hourly']['temperature_2m'];
        let daily: any = this.data['daily']['time'];
        let code: any = this.data['daily']['weathercode'];

        this.forecast['temperature'] = this.weatherClientService.getCurrentData(times, temperatures);
        this.forecast['temperatureTomorrow'] = this.weatherClientService.getTomorrowData(times, temperatures);
        this.forecast['temperatureAfterTomorrow'] = this.weatherClientService.getDayAfterTomorrowData(times, temperatures);
        this.forecast['currentWeather'] = this.weatherClientService.getCurrentWeatherCode(daily, code)
        this.forecast['tomorrowWeather'] = this.weatherClientService.getWeatherForDay(daily, code, 1);
        this.forecast['afterTomorrowWeather'] = this.weatherClientService.getWeatherForDay(daily, code, 2);

        this.setupWeatherMappings();

      })
    ;
  }
  private setupWeatherMappings(): void {
    this.weatherMappings = [
      { range: [0], imagePath: 'assets/images/sun.png' },
      { range: [1, 2, 3], imagePath: 'assets/images/clear-sky.png' },
      { range: Array.from({ length: 60 }, (_, i) => i + 4), imagePath: 'assets/images/rain.png' },
      { range: Array.from({ length: 7 }, (_, i) => i + 64), imagePath: 'assets/images/cloudy.png' },
      { range: Array.from({ length: 16 }, (_, i) => i + 71), imagePath: 'assets/images/snow.png' },
      { range: Array.from({ length: 13 }, (_, i) => i + 87), imagePath: 'assets/images/storm.png' },
    ];
  }
}
