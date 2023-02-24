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
  public activeLayer:any;
  public geoData:any;
  public paths:any;
  private initMap():void{
    this.map = L.map('map', { fullscreenControl: true }).setView([44.414165, 8.942184], 5);
  }
  public layerArray:any;
  private layerList:any=fetch('/assets/layers.json')
    .then((response) => response.json())
    .then((data) => this.layerArray=data);

  addActiveLayer(activeLayer:any):void{
    this.activeLayer = activeLayer;
  }
  addData(geo:any):void{
    this.geoData = geo;
  }
  addPaths(path:any):void{
    this.paths = path;
  }
  ngOnInit(): void{
    this.initMap();
  }
}
