import { TestBed } from '@angular/core/testing';
import {WeatherMappingService} from "./weather-mapping.service";


describe('WeatherMappingServiceService', () => {
  let service: WeatherMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
