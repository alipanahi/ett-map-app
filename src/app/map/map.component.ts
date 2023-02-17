import { Component, OnInit } from '@angular/core';
//import { LayersService } from '../layers.service';
// @ts-ignore
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor() { }

  private map:any;
  
  private geoData: any;
  private paths:any;

  public layerArray:any;
  private layerList:any=fetch('/assets/layers.json')
    .then((response) => response.json())
    .then((data) => this.layerArray=data);
  
  private initMap():void{
    this.map = L.map('map', { fullscreenControl: true }).setView([44.414165, 8.942184], 5);
  }
  // function to set layer base on user click
  public setLayer(layer:string='default'): void {console.log(layer);
    if(layer=='default'){
      ///////////////// default layer /////////////////
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
    }else{
      
        let selectedLayer = this.layerArray.filter((item:any)=>item.name==layer);
        //console.log(selectedLayer[0].url);
        L.tileLayer.wms(selectedLayer[0].url, {
          layers: selectedLayer[0].layers
        }).addTo(this.map);
    
    }
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
  // async function to get data from json
  async fetchData(url: any) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
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
    //this.map.on("click", addLayer);
    /////////////////// pointers data from json file  ///////////////////
    this.fetchData('/assets/pointers.json')
      .then((data) => {
        this.geoData = L.geoJSON(data, {
          onEachFeature: onEachFeature
        }).addTo(this.map);
        
      });
    this.fetchData('/assets/paths.json')
      .then((data) => {
        this.paths = L.geoJSON(data, {
          style: function (feature: any): any {
            switch (feature.properties.name) {
              case 'genoa': return { color: "#ff0000", weight: 4, opacity: 0.5 };
              case 'roma': return { color: "#0000ff", weight: 4 };
            }
          },
          onEachFeature: onEachFeature
        }).addTo(this.map);
        
      });
    this.setLayer();
    /*
    /////////////////////////   points style        /////////////
    
    var stateStyle = {
      "color": "#008f68",
      "weight": 3,
      "opacity": 0.5,
      "fillOpacity": 0.8,
      "fillColor": '#6DB65B'
    };
    let usaData;
    ////////////////// DATA from Json ////////////
    this.layerService.getStateShapes().subscribe(states => {
      usaData = L.geoJSON(states, {
        style: stateStyle
      }).addTo(this.map);

      
    });
    */

  }


}
