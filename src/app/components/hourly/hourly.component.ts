import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeatherMappingService} from "../../services/weather-mapping.service";
import {WeatherClientService} from "../../services/weather-client.service";

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {
  data: any;
  form: FormGroup;
  forecast: Record<string, any> = {};

  constructor(
    private weatherClientService: WeatherClientService,
    private fb: FormBuilder,
    private weatherMappingService: WeatherMappingService
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
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
        this.forecast['currentWeather'] = this.weatherClientService.getDailyWeather(daily, code, 0);
        this.forecast['specificWeather'] = null;
        this.forecast['specificTemperature'] = null;
      });
  }

  getWeatherImage(weatherCode: any): string {
    return this.weatherMappingService.getWeatherImage(weatherCode);
  }

  showWeather(): void {
    if (this.form.valid) {
      const selectedDate = this.form.value.date;
      const selectedTime = this.form.value.time;
      console.log(selectedDate)
      console.log(selectedTime)
      console.log(this.forecast['temperature'])
      console.log(this.forecast['currentWeather'])
    }
  }
}
