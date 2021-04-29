import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search-page/search-page.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path:'', component:HomePageComponent},
      {path:'search', component:SearchComponent},
      
    ]),
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
