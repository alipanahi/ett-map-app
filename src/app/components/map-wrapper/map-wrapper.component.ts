import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';

@Component({
  selector: 'app-map-wrapper',
  templateUrl: './map-wrapper.component.html',
  styleUrls: ['./map-wrapper.component.css']
})
export class MapWrapperComponent implements OnInit {
  leaflet = L;
  public map:any;
  private initMap():void{
    this.map = L.map('map', { fullscreenControl: true }).setView([44.414165, 8.942184], 5);
  }
  ngOnInit(): void{
    this.initMap();
  }
}
