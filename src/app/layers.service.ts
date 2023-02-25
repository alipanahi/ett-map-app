import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LayersService {

  constructor(private http: HttpClient) { }

  getLayers() {
    return this.http.get('/assets/layers.json');
  }
  getPointers() {
    return this.http.get('/assets/pointers.json');
  }
  getPaths() {
    return this.http.get('/assets/paths.json');
  }
  getBaselayer() {
    return this.http.get('/assets/baselayer.json');
  }
}
