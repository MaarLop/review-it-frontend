import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing';
import { SpinnerComponent } from './spinner/spinner-component';
import { HomePageComponent } from './home-page/home-page.component';
import { CoreModule } from './core/core.modules';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll'
import { SideNavComponent } from './nav/nav.component';
import { SearchComponent } from './search-page/search-page.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from '@auth0/auth0-angular';
import { PreHomePageComponent } from './pre-home-page/pre-home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './core/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SpinnerComponent,
    HomePageComponent,
    SideNavComponent,
    SearchComponent,
    FooterComponent,
    PreHomePageComponent,
    UserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    InfiniteScrollModule,
    AuthModule.forRoot({
      domain: 'dev-d8bhv2ic.us.auth0.com',
      clientId: 'OPF2R4rQ8M3OHOgZDooC4BJoK5kr12l2'
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
