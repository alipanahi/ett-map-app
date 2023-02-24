import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent {
  @Input() layerArray:any;
  @Input() map:any;
  @Input() L:any;
  @Input() geoData: any;
  @Input() paths:any;
  @Input() activeLayer:any;
  // function to set layer base on user click
  public setLayer(layer:string='default'): void {
    this.map.removeLayer(this.activeLayer);
    if(layer=='default'){
      ///////////////// default layer /////////////////
      this.activeLayer = this.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
    }else{
      
        let selectedLayer = this.layerArray.filter((item:any)=>item.name==layer);
        //console.log(selectedLayer[0].url);
        this.activeLayer = this.L.tileLayer.wms(selectedLayer[0].url, {
          layers: selectedLayer[0].layers
        });
    
    }
    this.activeLayer.addTo(this.map);
  }
  public showMarkers(e:any,marker:string):void{
  
    if(e.target.checked){
      if(marker=='pointers'){
        this.geoData.addTo(this.map);
      }else if(marker=='paths'){
        this.paths.addTo(this.map);
      }
    }else{
      if(marker=='pointers'){
        this.map.removeLayer(this.geoData);
      }else if(marker=='paths'){
        this.map.removeLayer(this.paths);
      }
    }
  }
}
