import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HourlyComponent } from './components/hourly/hourly.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    HourlyComponent,
    DashboardComponent
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
