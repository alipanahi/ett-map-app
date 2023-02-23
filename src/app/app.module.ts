import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map-wrapper/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { LayersService } from './layers.service';
import { MapWrapperComponent } from './components/map-wrapper/map-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    MapWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    LayersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
