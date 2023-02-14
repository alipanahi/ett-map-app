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
  legend_view:boolean = false;
  
  constructor(private layerService: LayersService) { }

  
  ngOnInit(): void {
    ////////// on dblclick event /////////////////
    function highlightFeature(e:any){
      //this.legend_view = false;
      let div:any = document.getElementById('dataDiv');
      div.innerHTML=`<p>${e.latlng}</p>`;
      //alert(e.latlng);
    }
    /////////////// pointers dblclick event ///////////////////
    function onEachFeature(feature: any, layer: any) {
      // does this feature have a property named popupContent?
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
      layer.on({
        dblclick: highlightFeature
      });

    }

    let map = L.map('map',{fullscreenControl: true}).setView([44.414165, 8.942184], 5);
    
    //markers
    var marker_genoa = L.marker([44.4, 8.9]).addTo(map).bindPopup("<b>Genoa!</b><br>ETT S.p.A.<br>Double click to see the coordination!");
    var marker_manduria = L.marker([40.40221612940531, 17.632182690036974]).addTo(map);
    //marker_manduria.bindPopup("<b>Manduria!</b><br>Ali Hussain").openPopup();
    marker_manduria.bindPopup("<b>Manduria!</b><br>Ali Hussain");
    

    //double click event listener
    marker_genoa.on('dblclick', highlightFeature);
    
    
    /////////////////// manual data  ///////////////////
    var points = [{
      "type": "Feature",
      "properties": {
        "name": "rome pointer",
        "amenity": "pointer",
        "popupContent": "Roma!<br>Double click to see the coordination!"
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
        "popupContent": "<b>fastes path to Genoa!</b><br>Double click to see the coordination!"
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
        "popupContent": "<b>This is the path to roma!</b><br>Double click to see the coordination!"
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
    var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
      layers: 'TOPO-OSM-WMS'
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
        "wms": wmsLayer
      };
      var overlayMaps = {
        "Paths": geoData,
        "USA States": usaData,
      };
      L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
    });
  

  }


}
