import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapWrapperComponent } from './components/map-wrapper/map-wrapper.component';
import { MapComponent } from './components/map-wrapper/map/map.component';

const routes: Routes = [
  { path: 'home-component', component: HomeComponent },
  { path: 'map-component', component: MapComponent },
  { path: 'wrapper-component', component: MapWrapperComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
