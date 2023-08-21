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

        this.forecast['temperature'] = this.weatherClientService.getTemperature(times, temperatures, 0);
        this.forecast['temperatureTomorrow'] = this.weatherClientService.getTemperature(times, temperatures, 24);
        this.forecast['temperatureAfterTomorrow'] = this.weatherClientService.getTemperature(times, temperatures, 48);
        this.forecast['currentWeather'] = this.weatherClientService.getDailyWeather(daily, code, 0);
        this.forecast['tomorrowWeather'] = this.weatherClientService.getDailyWeather(daily, code, 1);
        this.forecast['afterTomorrowWeather'] = this.weatherClientService.getDailyWeather(daily, code, 2);
      });
  }

  getWeatherImage(weatherCode: any): string {
    return this.weatherMappingService.getWeatherImage(weatherCode);
  }
}
