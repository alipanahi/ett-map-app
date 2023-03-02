import { Conditional } from '@angular/compiler';
import { Component,Input, OnInit } from '@angular/core';
import { DisplayerService } from './displayer.service';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.css']
})
export class DisplayerComponent implements OnInit {
  public temperature:any;
  public layerName:any;

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
        this.layerName = v.configuration.options.layers;
        document.querySelector(".displayer")?.classList.remove("hidden");
        //console.log(value);
      });
    }
  }
  
  constructor(public displayerService: DisplayerService){}

  ngOnInit(): void {
    const buttonClose = document.querySelector(".close-btn");
    buttonClose?.addEventListener("click", () => {
      // close sidebar when click on close button
      document.querySelector(".displayer")?.classList.add("hidden");
    });
  
  }
}
