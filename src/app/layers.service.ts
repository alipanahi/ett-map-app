import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LayersService {

  constructor(private http: HttpClient) { }

  getStateShapes() {
    return this.http.get('/assets/layers_data.json');
  }
}
