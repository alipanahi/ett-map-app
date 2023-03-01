import { Conditional } from '@angular/compiler';
import { Component,Input } from '@angular/core';
import { DisplayerService } from './displayer.service';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.css']
})
export class DisplayerComponent {
  @Input() public set info(v : any) {
    if (v) {
      this.displayerService.getFeature(v).subscribe(layer => {
        console.log('service',layer);
      });
    }
  }
  constructor(public displayerService: DisplayerService){}
}
