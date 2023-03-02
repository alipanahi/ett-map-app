import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayerService {
  
  constructor(public http: HttpClient) { }

  public getFeature(info : any): Observable<any>{
    let options = this.setOptions(info);
    let url = info.configuration.getFeatureInfoUrl;//getFeatureInfoUrl
    
    return this.http.get<any>(url, {params: options, responseType: 'text' as 'json'});
  }
  public setOptions(info: any): any{console.log(info);
    const nw = info.crs.project(info.bounds.getNorthWest());
    const se = info.crs.project(info.bounds.getSouthEast());
    const bbox = [nw.x, se.y, se.x, nw.y].join(',');

    (info);

    const options = {
      width: 512,
      height: 512,
      bbox,
      service: 'WMS',
      version: '1.1.1',
      layers: info.configuration.getFeatureLayers,
      query_layers: info.configuration.getFeatureLayers ,
      format: info.configuration.options.format,
      transparent: info.configuration.options.transparent,
      request: 'GetFeatureInfo',
      X: Math.round(info.point.containerPoint.x),
      Y: Math.round(info.point.containerPoint.y),
      INFO_FORMAT: 'text/xml',
      srs: info.crs.code,
      tiled: true,
      url: info.configuration.getFeatureInfoUrl
    };

    return options;
  }
}
