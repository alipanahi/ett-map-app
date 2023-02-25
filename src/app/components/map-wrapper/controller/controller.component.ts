import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent {
  @Input() layerArray: any;
  @Output() selectedLayer = new EventEmitter<any>();
  @Output() addRemoveData = new EventEmitter<any>();
  private activeLayer: any;
  // function to set layer base on user click
  public setLayer(layer: string = 'default'): void {
    //this.map.removeLayer(this.activeLayer);
    if (layer == 'default') {
      this.activeLayer = layer;
    } else {
      this.activeLayer = this.layerArray.filter((item: any) => item.name == layer);
    }
    this.selectedLayer.emit(this.activeLayer);
  }
  public showMarkers(e: any, marker: string): void {
    this.addRemoveData.emit({"event":e.target.checked,"marker":marker});
  }
}
