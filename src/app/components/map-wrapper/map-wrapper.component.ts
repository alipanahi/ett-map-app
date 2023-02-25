import { Component, OnInit,Output, EventEmitter } from '@angular/core';
// @ts-ignore
//import * as L from 'leaflet';

@Component({
  selector: 'app-map-wrapper',
  templateUrl: './map-wrapper.component.html',
  styleUrls: ['./map-wrapper.component.css']
})
export class MapWrapperComponent {
  public addRemoveMarker:any;
  public layerGroup:any;
  public selectedLayer:any;
  public layerArray:any;
  private layerList:any=fetch('/assets/layers.json')
    .then((response) => response.json())
    .then((data) => {
      this.layerArray = data;
      //data.map((item:any)=>this.layerGroup.addLayer(item));
    });
  addSelectedLayer(layer:any):void{
    this.selectedLayer = layer;
  }
  
  addRemoveData(marker:any):void{
    this.addRemoveMarker = marker;
  }
  
  
}
