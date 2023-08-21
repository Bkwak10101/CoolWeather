import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeatherMappingService} from "../../services/weather-mapping.service";
import {WeatherClientService} from "../../services/weather-client.service";

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {
  data: any;
  form: FormGroup = this.fb.group({
    time: ['', Validators.required],
    date: [null, [Validators.required, this.futureDateValidator()]],
  });
  forecast: Record<string, any> = {};
  specificTemperature: number | undefined;
  showWeatherDetails: boolean = false;

  constructor(
    private weatherClientService: WeatherClientService,
    private fb: FormBuilder,
    private weatherMappingService: WeatherMappingService
  ) {
    this.form = this.fb.group({
      time: ['', Validators.required],
      date: [null, [Validators.required, this.futureDateValidator()]],
    });
  }

  ngOnInit(): void {
    this.data = this.weatherClientService
      .getData()
      .subscribe((data) => {
        this.data = data
        let times: any = this.data['hourly']['time'];
        let temperatures: any = this.data['hourly']['temperature_2m'];
        this.forecast['temperature'] = this.weatherClientService.getCurrentTemperature(times, temperatures);
      });
  }

  futureDateValidator() {
    return (control: AbstractControl) => {
      const selectedDate = control.value;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      return selectedDate && selectedDate < currentDate
        ? {futureDate: true}
        : null;
    };
  }

  getWeatherImage(weatherCode: any): string {
    return this.weatherMappingService.getWeatherImage(weatherCode);
  }

  showWeather(): void {
    if (this.form.valid) {
      const selectedDate = this.form.value.date;
      const selectedTime = this.form.value.time;
      let hourlyDate: any = this.data['hourly']['time'];
      let dailyDate: any = this.data['daily']['time'];
      let code: any = this.data['daily']['weathercode'];
      let temperatures: any = this.data['hourly']['temperature_2m'];
      this.forecast['specificTemperature'] = this.weatherClientService.getSpecificTemperature(
        hourlyDate,
        temperatures,
        selectedDate,
        selectedTime
      );
      this.forecast['specificWeather'] = this.weatherClientService.getSpecificWeather(
        dailyDate,
        code,
        selectedDate
      );
      this.specificTemperature = this.forecast['specificTemperature'];
      this.showWeatherDetails = true;
    }
  }
}
