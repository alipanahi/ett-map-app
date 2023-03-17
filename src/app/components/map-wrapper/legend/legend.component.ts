import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent{
  
  showTemperature(index:any) {
    document.getElementById('span_'+index)!.classList.add('visible');
  }
  hideTemperature(index:any) {
    document.getElementById('span_'+index)!.classList.remove('visible');
  }

  @Input() public set selectedLayer(l : any) {
    if(l){
      let div = document.getElementById('wms_legend');
      let temps = []
      if (l[0].name=='Temperatura a 2 m (3Km)') {//only for our wms layer
        //loop form max temp to min temp to create the objects
        for(let i=l[0].legend.max;i>=l[0].legend.min;i--){
          temps.push({"temperature": i})
        }
        let url = l[0].legend.url
        div!.classList.remove("hidden")
        div!.style.backgroundImage = "url('"+url+"')"
        //create div element for every object of temperature
        temps.forEach((item:any,index:number)=>{
          let elem = document.createElement('div')
          elem.setAttribute('id',"temp_"+index)
          div!.appendChild(elem)
          elem.classList.add("temp_div")
          //create span as tooltip for every div
          let span = document.createElement('span')
          span.setAttribute('id',"span_"+index)
          span.classList.add('legend-tooltip')
          span.textContent=item.temperature+" °C"
          elem.appendChild(span)
          //add eventlistener for mouseover to show the temperature
          elem.addEventListener("mouseover", ()=>{
            this.showTemperature(index)
          })
          //add eventlistener for mouseout to hide the tooltip
          elem.addEventListener("mouseout", ()=>{
            this.hideTemperature(index)
          })
        })
        
      }else{
        div!.classList.add("hidden");
      }
    }
  }
  
}
