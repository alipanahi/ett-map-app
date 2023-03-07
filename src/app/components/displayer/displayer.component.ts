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
        'max-width': '300px',
        opacity: 1,
        
      })),
      state('closed', style({
        width: '0',
        visibility: "hidden",
        opacity: 0.1,
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

  @Input() public set info(v : any) {
    if (v) {
      this.displayerService.getFeature(v).subscribe(layer => {
        //console.log('service',layer);
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(layer,"text/xml");
        let value = xmlDoc.getElementsByTagName("value")[0].childNodes[0].nodeValue;
        let valueNumber = Number(value);
        let valueCelsius = valueNumber-273.15;
        this.temperature = valueCelsius.toFixed(2);
        this.layerName = v.configuration.name;
        //document.querySelector(".displayer")?.classList.remove("hidden");
        this.isOpen = true;
        //console.log(value);
      });
    }
  }
  
  constructor(public displayerService: DisplayerService){}
  toggle() {
    this.isOpen = false;
  }
  
}
