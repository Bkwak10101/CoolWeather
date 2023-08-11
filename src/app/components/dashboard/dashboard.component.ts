import {Component, OnInit, Inject} from '@angular/core';
import {WeatherClientService} from "../../services/weather-client.service";
import {WeatherMappingService} from "../../services/weather-mapping.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  forecast: Record<string, any> = {
    tomorrowWeather: null,
    afterTomorrowWeather: null
  };

  constructor(
    private weatherClientService: WeatherClientService,
    @Inject(WeatherMappingService) private weatherMappingService: WeatherMappingService
  ) {
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
      });
  }

  getWeatherImage(weatherCode: any): string {
    return this.weatherMappingService.getWeatherImage(weatherCode);
  }
}
