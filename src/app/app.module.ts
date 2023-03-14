import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { LayersService } from './layers.service';
import { MapWrapperComponent } from './components/map-wrapper/map-wrapper.component';
import { ControllerComponent } from './components/map-wrapper/controller/controller.component';
import { DisplayerComponent } from './components/displayer/displayer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LegendComponent } from './components/map-wrapper/legend/legend.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    MapWrapperComponent,
    ControllerComponent,
    DisplayerComponent,
    LegendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    LayersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
