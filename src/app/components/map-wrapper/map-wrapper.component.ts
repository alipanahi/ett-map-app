import { Component, OnInit } from '@angular/core';
import { LayersService } from '../../layers.service';
// @ts-ignore
//import * as L from 'leaflet';

@Component({
  selector: 'app-map-wrapper',
  templateUrl: './map-wrapper.component.html',
  styleUrls: ['./map-wrapper.component.css']
})
export class MapWrapperComponent implements OnInit {
  constructor(private layerService: LayersService) { }

  public addRemoveMarker:any;
  public layerGroup:any;
  public selectedLayer:any;
  public layerArray:any;
  public baselayer:any;
  public configuration:any;

  addSelectedLayer(layer:any):void{
    this.selectedLayer = layer;
  }
  
  addRemoveData(marker:any):void{
    this.addRemoveMarker = marker;
  }
  setConfiguration(config:any):void{
    this.configuration = config;
    
  }
  ngOnInit(): void {
    //fetch baselayer inof from json file
    this.layerService.getBaselayer().subscribe(layer => {
      this.baselayer = layer;
    });
    //fetch data from json file
    this.layerService.getLayers().subscribe(layers => {
      this.layerArray = layers;
    });
    
  }
  
}
