import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { trigger, transition, state, animate, style } from '@angular/animations';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
  animations: [
    trigger('graph', [
      // ...
      state('open', style({
        bottom: "5px"

      })),
      state('closed', style({
        bottom: "-320px"
      })),

      transition('open => closed,closed=>open', [
        animate('1s')
      ]),

    ]),
  ]
})
export class PlotComponent implements OnChanges {
  isOpen = false
  temp_array: Array<number> = []
  value_array: Array<string>=[]
  @Input() data: any
  updateFlag = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Options = {
    title: {
      text: "Temperature height above ground"
    },
    xAxis: {
      categories: this.value_array
    },
    yAxis: {
      title: {
        text: "Temperature"
      }
    },
    series: [
      {
        name: 'Hours of the day',
        type: 'line',
        data: []
      }
    ] 
  };
  // @Input() public set data(d : any) {
  //   if (d) {
  //     //console.log("forecastingData",d)
  //     //let points = d.getElementsByTagName('point')
  //     //console.log("forecastingData", points)

  //     for(const point in d){
  //       let data = d[point]
  //       //let date = data.querySelector("[name=date]");
  //       //let temp = data.querySelector("[name=Temperature_height_above_ground]").textContent
  //       //let valueCelsius = Number(temp)-273.15;
  //       //this.temp_array.push(Number(valueCelsius.toFixed(0)))
  //     }

  //     this.isOpen = true

  //   }
  //   console.log(this.temp_array)
  // }

  toggle() {
    this.isOpen = false;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes['data'].previousValue) {
        this.temp_array=[]//empty the old data
        let data = changes['data'].currentValue
        for (let item of data) {

          let date = new Date(item.childNodes[0].textContent).getHours()
          this.value_array.push(String(date))
          let temp = item.childNodes[4].textContent
          let valueCelsius = Number(temp)-273.15;
          this.temp_array.push(Number(valueCelsius.toFixed(1)))
        }
        
        this.chartOptions.series = [{
            type: 'line',
            data: this.temp_array,

        }]
        this.updateFlag = true
        this.isOpen = true

      }
    }
  }
}
