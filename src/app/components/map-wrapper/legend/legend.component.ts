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
        div!.innerHTML=''
        //loop form max temp to min temp to create the objects
        
        //using background color
        for(let i=l[0].legend.max;i>=l[0].legend.min;i--){
          temps.push({"temperature": i})
        }
        let url = l[0].legend.url
        //div!.classList.remove("hidden")
        div!.style.display='flex'
        div!.style.backgroundImage = "url('"+url+"')"
        
       //using colors
       /*
        let baseTemp = Number(l[0].legend.min)
        let eachStepTemp = Number(((l[0].legend.max - l[0].legend.min) / l[0].legend.color.length).toFixed(2))
        for(let i=0;i<=l[0].legend.color.length;i++){
          temps.push({"color": l[0].legend.color[i],"temperature":baseTemp.toFixed(0)})
          baseTemp+=eachStepTemp
        }
        */
        //create div element for every object of temperature
        temps.forEach((item:any,index:number)=>{
          let elem = document.createElement('div')
          elem.setAttribute('id',"temp_"+index)
          //put color
          //elem!.style.backgroundColor = item.color
          elem!.style.backgroundColor = item.temperature
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
        
      }else{console.log(div)
        div!.style.display='none'
      }
    }
  }
  
}
