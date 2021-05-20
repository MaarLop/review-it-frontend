import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  title = 'landing-page';
  pageYoffset = 0;

  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private scroll: ViewportScroller){
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  goToSearchUser(){
    console.log(5334125)
  }
}
