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
    function showSidebarWidthText(e:any) {
      console.log(e);
      document.querySelector(".map_lengend")?.classList.remove("hidden");
      addContentToSidebar(e);

    }
    function addContentToSidebar(e:any) {
    
      // create sidebar content
      const sidebarTemplate = `
      <article class="sidebar-content">
        <h3 style="position: sticky;top: 0;color: #fff;background: #0052b1;padding: 10px 35px 10px 15px;">
          ${e.target.feature.properties.name}-<span>${e.latlng}</span>
          </h3>
        <div class="info-content">
          <div class="info-description"><p>${e.target.feature.properties.amenity}</p></div>
        </div>
      </article>
  
      `;
    
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



    let map = L.map('map',{fullscreenControl: true}).setView([44.414165, 8.942184], 5);
    
    /////////////////// manual data  ///////////////////
    var points = [{
      "type": "Feature",
      "properties": {
        "name": "Genoa",
        "amenity": "Genoa (Genova) is a port city and the capital of northwest Italy's Liguria region. It's known for its central role in maritime trade over many centuries.",
        "popupContent": "<b>Genoa!</b><br>Double click to see the details!"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [8.9, 44.4]
      }
    },{
      "type": "Feature",
      "properties": {
        "name": "Manduria",
        "amenity": "Manduria is a city and comune of Apulia, Italy, in the province of Taranto. With c. 32,000 inhabitants, it is located 35 kilometres east of Taranto. ",
        "popupContent": "<b>Manduria!</b><br>Double click to see the details!"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [17.632182690036974, 40.40221612940531]
      }
    }, {
      "type": "Feature",
      "properties": {
        "name": "Rome",
        "amenity": "Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome, and a special comune named Comune di Roma Capitale.",
        "popupContent": "<b>Rome!</b><br>Double click to see the details!"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [12.454277110931622, 41.87573990881038]
      }
    }, {
      "type": "Feature",
      "properties": {
        "name": "genoa",
        "amenity": "path to Genoa",
        "popupContent": "<b>fastes path to Genoa!</b><br>Double click to see the details!"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [17.632182690036974, 40.40221612940531],
          [12.519242926923734, 41.856478659775874],
          [8.942184, 44.414165]
        ]
      }
    }, {
      "type": "Feature",
      "properties": {
        "name": "roma",
        "amenity": "Path to roma",
        "popupContent": "<b>This is the path to roma!</b><br>Double click to see the details!"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [17.632182690036974, 40.40221612940531],
          [16.86284396816336, 41.10767086815544],
          [14.235613478066037, 40.85209446693129],
          [12.454277110931622, 41.87573990881038]
        ]
      }
    }];

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
    var Floods = L.tileLayer.wms('http://wms.pcn.minambiente.it/ogc?',{
      layers: 'Sicilia_ITH2018'
    });
    ////////////////  earth at night layer       ////////////
    var earthatnight = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
      attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
      bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
      minZoom: 1,
      maxZoom: 8,
      format: 'jpg',
      time: '',
      tilematrixset: 'GoogleMapsCompatible_Level'
    });
    
    /////////////////////////   points style        /////////////
    let geoData = L.geoJSON(points, {
      style: function (feature: any): any {
        switch (feature.properties.name) {
          case 'genoa': return { color: "#ff0000", weight: 4, opacity: 0.5 };
          case 'roma': return { color: "#0000ff", weight: 4 };
        }
      },
      onEachFeature: onEachFeature
    }).addTo(map);
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
        "EarthAtNight": earthatnight,
        "wms": wmsLayer,
        "Floods": Floods
      };
      var overlayMaps = {
        "Paths": geoData,
        "USA States": usaData,
      };
      L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
    });
  

  }


}
