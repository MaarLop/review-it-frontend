import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing';
import { HomePageComponent } from './home-page/home-page.component';
import { CoreModule } from './core/core.modules';
import { ReviewListComponent } from './core/review-list/review-list.component';
import { HttpClientModule } from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { SideNavComponent } from './nav/nav.component';
import { SearchComponent } from './search-page/search-page.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from '@auth0/auth0-angular';
import { PreHomePageComponent } from './pre-home-page/pre-home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './user/user.component';
import { FollowersModalCOmponent } from './user/modal-followers/modal.component';
import { UserSearchComponent } from './search-user/search-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomePageComponent,
    SideNavComponent,
    SearchComponent,
    FooterComponent,
    PreHomePageComponent,
    UserComponent,
    FollowersModalCOmponent,
    UserSearchComponent
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
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
