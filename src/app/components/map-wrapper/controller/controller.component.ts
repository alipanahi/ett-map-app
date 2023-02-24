import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent {
  @Input() layerArray: any;
  @Input() map: any;
  @Input() L: any;
  @Input() geoData: any;
  @Input() paths: any;
  @Output() selectedLayer = new EventEmitter<any>();
  private activeLayer: any;
  // function to set layer base on user click
  public setLayer(layer: string = 'default'): void {
    //this.map.removeLayer(this.activeLayer);
    if (layer == 'default') {
      this.activeLayer = layer;
    } else {

      let selected = this.layerArray.filter((item: any) => item.name == layer);
      //console.log(selectedLayer[0].url);
      this.activeLayer = this.L.tileLayer.wms(selected[0].url, {
        layers: selected[0].layers
      });
    }
    this.selectedLayer.emit(this.activeLayer);
  }
  public showMarkers(e: any, marker: string): void {

    if (e.target.checked) {
      if (marker == 'pointers') {
        this.geoData.addTo(this.map);
      } else if (marker == 'paths') {
        this.paths.addTo(this.map);
      }
    } else {
      if (marker == 'pointers') {
        this.map.removeLayer(this.geoData);
      } else if (marker == 'paths') {
        this.map.removeLayer(this.paths);
      }
    }
  }
}
