import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class SideNavComponent implements OnInit{
  panelOpenState = false;

  constructor(){
  }
    ngOnInit(): void {
    }
}