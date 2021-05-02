import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing';
import { HomePageComponent } from './home-page/home-page.component';
import { CoreModule } from './core/core.modules';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './nav/nav.component';
import { SearchComponent } from './search-page/search-page.component';
import { FooterComponent } from './footer/footer.component';
import { ReviewListComponent } from './core/review-list/review-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomePageComponent,
    SideNavComponent,
    SearchComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
