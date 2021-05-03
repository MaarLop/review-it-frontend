import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './core/user/user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search-page/search-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path:'', component:HomePageComponent},
      {path:'search', component:SearchComponent, canActivate: [ AuthGuard ]},
      {path:'profile', component:UserComponent, canActivate: [ AuthGuard ]},
      
    ]),
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
