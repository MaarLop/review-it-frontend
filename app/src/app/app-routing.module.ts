import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './401/not-found.component';
import { ChatComponent } from './chat/chat.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search-page/search-page.component';
import { UserSearchComponent } from './search-user/search-user.component';
import { AuthGuard } from './services/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path:'', component:HomePageComponent},
      {path:'search', component:SearchComponent, canActivate: [ AuthGuard ]},
      {path:'profile', component:UserComponent, canActivate: [ AuthGuard ]},
      {path:'user/:id', component:UserComponent, canActivate: [ AuthGuard ]},
      {path:'search-user', component:UserSearchComponent, canActivate: [ AuthGuard ]},
      {path:'chat', component:ChatComponent, canActivate: [ AuthGuard ]},
      {path:'chat/:username', component:ChatComponent, canActivate: [ AuthGuard ]},
      {path: '**', component: PageNotFoundComponent }
    ]),
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
