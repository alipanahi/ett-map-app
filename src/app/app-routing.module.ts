import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapWrapperComponent } from './components/map-wrapper/map-wrapper.component';

const routes: Routes = [
  { path: 'home-component', component: HomeComponent },
  { path: 'wrapper-component', component: MapWrapperComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
