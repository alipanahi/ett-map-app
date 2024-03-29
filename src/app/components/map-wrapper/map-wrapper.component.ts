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
  public forecastingData:any;
  public graphDisplayer:any;

  addSelectedLayer(layer:any):void{
    this.selectedLayer = layer;
  }
  
  addRemoveData(marker:any):void{
    this.addRemoveMarker = marker;
  }
  setConfiguration(config:any):void{
    this.configuration = config;
    
  }
  setForecastingData(data:any):void{
    this.forecastingData = data;
    //console.log(data)
  }
  setopenGraphDisplayer(data:boolean):void{
    this.graphDisplayer = data;
    //console.log(data)
  }
  
  ngOnInit(): void {
    //fetch baselayer inof from json file
    this.layerService.getBaselayer().subscribe(layer => {
      this.baselayer = layer;
    });
    //fetch data from json file
    this.layerService.getLayers().subscribe(layers => {
      this.layerArray = layers;
      //this.legend = this.layerArray.filter((layer:any)=>layer.name=='Temperatura a 2 m (3Km)');
    });
    
  }
  
}
