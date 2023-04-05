import { Component, Input, OnChanges, SimpleChanges,Output,EventEmitter } from '@angular/core';
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
        animate('.6s')
      ]),

    ]),
  ]
})
export class PlotComponent implements OnChanges {
  isOpen = false
  value_array: Array<Array<any>>=[]
  @Input() data: any
  updateFlag = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Options = {
    title: {
      text: "Temperature height above ground"
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%e-%b,%H %p}'
      },
      //categories: this.value_array
    },
    yAxis: {
      title: {
        text: "Temperature"
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: " °C"
    },
    series: [
      {   
        color:"blue",
        name: 'Temprature',
        type: 'line',
        data: []
      }
    ] 
  };
  @Input() public set graphDisplayer(d : any) {
    if (d) {
      this.isOpen = d
    }
  }
 
  @Output() closeGraph = new EventEmitter<any>();
  toggle() {
    this.isOpen = false;
    this.closeGraph.emit(false);
  }
  changeAnimation(){
    this.chartOptions.series = [{
      animation: {
        duration: 5000,
        //easing:"easeInOutSine"//"easeInOutSine",easeOutBounce
      },
      type: 'line',
    }]
    this.updateFlag = true
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes['data'].previousValue) {
        this.value_array=[]//empty the old data
        let data = changes['data'].currentValue
        for (let item of data) {

          let date = new Date(item.childNodes[0].textContent).getTime()
          //this.value_array.push(String(date))
          let temp = item.childNodes[4].textContent
          let valueCelsius = Number(temp)-273.15;
          //this.temp_array.push(Number(valueCelsius.toFixed(1)))
          this.value_array.push([date,Number(valueCelsius.toFixed(1))])
        }
        
        this.chartOptions.series = [{
          type: 'line',
          data: this.value_array,

        }]
        this.updateFlag = true

      }
    }
    
  }
}
