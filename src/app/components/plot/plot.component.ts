import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent {
  @Input() public set data(d : any) {
    if (d) {
      //console.log("forecastingData",d)
      let points = d.getElementsByTagName('point')
      console.log("forecastingData",points)
    }
  }
}
