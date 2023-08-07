import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HourlyComponent} from './components/hourly/hourly.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from "./app-routing.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    HourlyComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    MatToolbarModule,
    MatTabsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
