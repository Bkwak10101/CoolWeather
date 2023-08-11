import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {WeatherMappingService} from "../../services/weather-mapping.service";

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private weatherMappingService: WeatherMappingService
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  getWeatherImage(weatherCode: any): string {
    return this.weatherMappingService.getWeatherImage(weatherCode);
  }
}
