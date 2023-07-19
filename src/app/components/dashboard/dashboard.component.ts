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

  constructor(private weatherClientService: WeatherClientService) {
  }

  ngOnInit(): void {
    this.data = this.weatherClientService
      .getData()
      .subscribe((data) => {
        this.data = data

        let times: any = this.data['hourly']['time'];
        let temperatures: any = this.data['hourly']['temperature_2m'];

        this.forecast['temperature'] = this.weatherClientService.getCurrentData(times, temperatures);
        this.forecast['temperatureTomorrow'] = this.weatherClientService.getTomorrowData(times, temperatures);
        this.forecast['temperatureAfterTomorrow'] = this.weatherClientService.getDayAfterTomorrowData(times, temperatures);
      })
    ;
  }
}
