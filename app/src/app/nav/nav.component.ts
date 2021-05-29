import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class SideNavComponent implements OnInit{

  icon = faUserPlus;
  constructor(public router: Router, @Inject(DOCUMENT) public document: Document, public auth: AuthService){
  }
  ngOnInit(): void {
  }

  goSearch(){
    this.router.navigate(['/search']);
  }

  goHome(){
    this.router.navigate(['/']);
  }

  goProfile(){
    this.router.navigate(['/profile']);
  }

  goToSearchUser(){
    this.router.navigate(['/search-user'])
  }
}