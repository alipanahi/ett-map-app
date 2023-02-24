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
  public geoData:any;
  public paths:any;
  public layerGroup:any;
  private initMap():void{
    this.map = L.map('map', { fullscreenControl: true }).setView([44.414165, 8.942184], 5);
    // Create group for your layers and add it to the map
    this.layerGroup = L.layerGroup().addTo(this.map);
  }
  
  public layerArray:any;
  private layerList:any=fetch('/assets/layers.json')
    .then((response) => response.json())
    .then((data) => {
      this.layerArray = data;
      //data.map((item:any)=>this.layerGroup.addLayer(item));
    });

  addToGroupLayer(layer:any):void{
    this.layerGroup.clearLayers();
    if(layer!=='default'){
      this.layerGroup.addLayer(layer);
    }
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
