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
      width: info.size.x,
      height: info.size.y,
      bbox,//:'626172.1357121639,5009377.085697314,1252344.2714243277,5635549.221409476',
      service: 'WMS',
      version: '1.3.0',
      layers: info.configuration.getFeatureLayers,
      query_layers: info.configuration.getFeatureLayers ,
      format: info.configuration.options.format,
      transparent: info.configuration.options.transparent,
      request: 'GetFeatureInfo',
      I: Math.round(info.point.containerPoint.x),
      J: Math.round(info.point.containerPoint.y),
      INFO_FORMAT: 'text/xml',
      CRS: info.crs.code,
      tiled: true,
      url: info.configuration.getFeatureInfoUrl
    };

    return options;
  }
}
