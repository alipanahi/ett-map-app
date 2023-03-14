import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent{
  @Input() public set selectedLayer(l : any) {
    if(l){
      let div = document.getElementById('wms_legend');
      if (l[0].name=='Temperatura a 2 m (3Km)') {
        let url = l[0].legend.url;
        div!.classList.remove("hidden");
        div!.style.backgroundImage = "url('"+url+"')";
      }else{
        div!.classList.add("hidden");
      }
    }
  }
}
