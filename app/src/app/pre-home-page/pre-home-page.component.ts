import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pre-home-page',
  templateUrl: './pre-home-page.component.html',
  styleUrls: ['./pre-home-page.component.scss']
})
export class PreHomePageComponent implements OnInit{
  title = 'pre-home-page';
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }
  ngOnInit(): void {
    
  }
  

}
