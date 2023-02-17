import { Component, OnInit } from '@angular/core';
import { LayersService } from '../layers.service';
// @ts-ignore
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor(private layerService: LayersService) { }


  ngOnInit(): void {

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
    // async function to get data from json
    async function fetchData(url: any) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    }


    let map = L.map('map', { fullscreenControl: true }).setView([44.414165, 8.942184], 5);

    /////////////////// pointers data from json file  ///////////////////
    let geoData: any;
    fetchData('/assets/pointers.json')
      .then((data) => {
        geoData = L.geoJSON(data, {
          style: function (feature: any): any {
            switch (feature.properties.name) {
              case 'genoa': return { color: "#ff0000", weight: 4, opacity: 0.5 };
              case 'roma': return { color: "#0000ff", weight: 4 };
            }
          },
          onEachFeature: onEachFeature
        }).addTo(map);
      });
    ///////////////// OpenStreetMap layer /////////////////
    let myLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    ////////////////// wms layer     //////////////
    var wmsLayer = L.tileLayer.wms('https://ows.mundialis.de/osm/service?', {
      layers: 'TOPO-OSM-WMS'
    });
    //layer from www.pcn.minambiente.it
    var Floods = L.tileLayer.wms('http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Batimetrica.map', {
      layers: 'EL.BATIMETRICA.'
    });
    var predefinito = L.tileLayer.wms('http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Bacini_idrografici.map', {
      layers: 'ID.ACQUEFISICHE.BACINIIDROGRAFICI.PRINCIPALI'
    });
    var ecopedologica = L.tileLayer.wms('http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Carta_ecopedologica.map', {
      layers: 'GE.CARTAECOPEDOLOGICA.GENERALE'
    });
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
      }).addTo(map);

      ///////////////////////    layers control    ////////////////////
      var baseMaps = {
        "OpenStreetMap": myLayer,
        "wms": wmsLayer,
        "Floods": Floods,
        "predefinito":predefinito,
        "Carta ecopedologica d'Italia":ecopedologica
      };
      var overlayMaps = {
        "Paths": geoData,
        "USA States": usaData,
      };
      L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
    });


  }


}
