import { Component,Input } from '@angular/core';
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
        animate('1s')
      ]),
      
    ]),
  ]
})
export class DisplayerComponent {
  public temperature:any;
  public layerName:any;
  isOpen = false;
  displayer_width:any;
  @Input() public set info(v : any) {
    if (v) {
      let startDate = new Date()
      startDate.setHours(0,0,0,0)
      let endDate = new Date()
      endDate.setDate(new Date().getDate()+2)
      endDate.setHours(0,0,0,0)
      //console.log(endDate)
      this.displayerService.getForcastingData(v,startDate.toISOString(),endDate.toISOString()).subscribe(data=>{
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data,"text/xml");
        console.log(xmlDoc)
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
  
}
