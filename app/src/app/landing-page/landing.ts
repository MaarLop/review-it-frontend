import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  title = 'landing-page';
  pageYoffset = 0;
  icon = faUserPlus;
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private scroll: ViewportScroller, private router: Router){
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  
  goHome(){
    this.router.navigate(['/'])
  }
}
