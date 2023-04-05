import { Component,Input, Output,EventEmitter } from '@angular/core';
import { DisplayerService } from './displayer.service';
import { trigger, transition, state, animate, style } from '@angular/animations';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.css'],
  animations: [
    trigger('displayerSlider', [
      // ...
      state('open', style({
        left:"5px"
        
      })),
      state('closed', style({
        left:"-200px"
      })),
      
      transition('open => closed,closed=>open', [
        animate('.6s')
      ]),
      
    ]),
  ]
})
export class DisplayerComponent {
  public temperature:any;
  public layerName:any;
  @Output() forecastingData = new EventEmitter<any>();
  isOpen = false;
  graphDisabl = true;
  @Output() openGraphDisplayer = new EventEmitter<boolean>();
  @Input() public set info(v : any) {
    if (v) {
      let startDate = new Date()
      startDate.setHours(0,0,0,0)
      let endDate = new Date()
      endDate.setDate(new Date().getDate()+2)
      endDate.setHours(0,0,0,0)
      //console.log(endDate)
      this.displayerService.getForecastingData(v,startDate.toISOString(),endDate.toISOString()).subscribe(data=>{
        let dataparser = new DOMParser();
        let xmlData = dataparser.parseFromString(data,"text/xml");
        let value = xmlData.getElementsByTagName("point");
        this.forecastingData.emit(value);
        document.querySelector(".graph")?.classList.remove("hidden");
        
        this.graphDisabl = false;
        document.getElementById('graph_btn')?.classList.add('graph-btn')
        
        //console.log(xmlData)
      })
      this.displayerService.getFeature(v).subscribe(layer => {
        //console.log('service',layer);
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(layer,"text/xml");
        let value = xmlDoc.getElementsByTagName("value")[0].childNodes[0].nodeValue;
        let valueNumber = Number(value);
        let valueCelsius = valueNumber-273.15;
        this.temperature = valueCelsius.toFixed(2);
        this.layerName = v.configuration.name;
        document.querySelector(".displayer")?.classList.remove("hidden");
        
        this.isOpen = true;
      });
    }
  }
  
  constructor(public displayerService: DisplayerService){}
  toggle() {
    this.isOpen = false;
  }
  openGraph(){
    this.openGraphDisplayer.emit(true);
  }
  
}
