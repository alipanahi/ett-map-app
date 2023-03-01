import { Component, Input, OnInit, OnChanges, SimpleChanges, Output,EventEmitter } from '@angular/core';
import { LayersService } from '../../layers.service';
// @ts-ignore
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, OnChanges {

  constructor(private layerService: LayersService) { }
  private map: any;
  private layerGroup: any;
  private geoData: any;
  private paths: any;

  @Input() selectedLayer: any;
  @Input() addMarker: any;
  @Input() baselayer: any;
  @Output() config = new EventEmitter<any>();
  private initMap(): void {

    this.map = L.map('map', { fullscreenControl: true }).setView([44.414165, 8.942184], 5);

    this.layerGroup = L.layerGroup().addTo(this.map);

    this.map.on('click', (point: any) =>{
      let configuration = {
        point,
        bounds: this.map.getBounds(),
        size: this.map.getSize(),
        crs: this.map.options.crs,
        configuration: this.selectedLayer[0],
      }
      this.config.emit(configuration);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['baselayer']) {
      if (changes['baselayer'].currentValue !== changes['baselayer'].previousValue) {
        //console.log('here',this.baselayer)
        L.tileLayer(this.baselayer.url, {
          maxZoom: 19,
          minZoom: 3,
          attribution: `&copy; <a href="${this.baselayer.attribution}">${this.baselayer.name}</a>`
        }).addTo(this.map);
      }
    }
    if (changes['selectedLayer']) {
      if (changes['selectedLayer'].currentValue !== changes['selectedLayer'].previousValue) {
        this.layerGroup.clearLayers();
        if (this.selectedLayer !== 'default') {
          let now = new Date();now.setHours(12,0,0,0);
          let nowString = now.toISOString();
          let options = this.selectedLayer[0].options;
            let activeLayer = L.tileLayer.wms(this.selectedLayer[0].url,{...options,time:nowString});
            this.layerGroup.addLayer(activeLayer);
        }
      }
    }
    if (changes['addMarker']) {
      if (changes['addMarker'].currentValue !== changes['addMarker'].previousValue) {
        //show or hide data
        if (this.addMarker.event == true) {
          if (this.addMarker.marker == 'pointers') {
            this.geoData.addTo(this.map);
          } else if (this.addMarker.marker == 'paths') {
            this.paths.addTo(this.map);
          }
        } else {
          if (this.addMarker.marker == 'pointers') {
            this.map.removeLayer(this.geoData);
          } else if (this.addMarker.marker == 'paths') {
            this.map.removeLayer(this.paths);
          }
        }
      }
    }

  }
  ngOnInit(): void {
    this.initMap();
    /////////////// pointers dblclick event ///////////////////
    function onEachFeature(feature: any, layer: any) {
      // does this feature have a property named popupContent?
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
      layer.on({
        dblclick: showSidebarWidthText
      });

    }
    function showSidebarWidthText(e: any) {
      //console.log(e.latlng.lat);
      document.querySelector(".map_lengend")?.classList.remove("hidden");
      addContentToSidebar(e);

    }
    function addContentToSidebar(e: any) {
      // create sidebar content
      const sidebarTemplate = `
      <article class="sidebar-content">
        <h3 style="position: sticky;top: 0;color: #fff;background: #0052b1;padding: 10px 35px 10px 15px;">
          ${e.target.feature.properties.name} - <span>${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}</span>
          </h3>
        <div class="info-content">
          <div class="info-description"><p>${e.target.feature.properties.amenity}</p></div>
        </div>
      </article>`;

      const sidebar = document.querySelector(".map_lengend");
      const sidebarContent = document.querySelector(".sidebar-content");

      // always remove content before adding new one
      sidebarContent?.remove();

      // add content to sidebar
      sidebar?.insertAdjacentHTML("beforeend", sidebarTemplate);

    }
    // close when click esc
    document.addEventListener("keydown", function (event) {
      // close sidebar when press esc
      if (event.key === "Escape") {
        closeSidebar();
      }
    });
    const buttonClose = document.querySelector(".close-button");
    buttonClose?.addEventListener("click", () => {
      // close sidebar when click on close button
      closeSidebar();
    });
    function closeSidebar() {
      // remove class active-sidebar
      document.querySelector(".map_lengend")?.classList.add("hidden");
    }
    /////////////////// pointers data from json file  ///////////////////
    this.layerService.getPointers().subscribe(points => {
      this.geoData = L.geoJSON(points, {
        onEachFeature: onEachFeature
      }).addTo(this.map);

    });
    this.layerService.getPaths().subscribe(path => {
      this.paths = L.geoJSON(path, {
        style: function (feature: any): any {
          switch (feature.properties.name) {
            case 'genoa': return { color: "#ff0000", weight: 4, opacity: 0.5 };
            case 'roma': return { color: "#0000ff", weight: 4 };
          }
        },
        onEachFeature: onEachFeature
      }).addTo(this.map);
    });

  }
}
