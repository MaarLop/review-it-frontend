import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class SideNavComponent implements OnInit{
  constructor(public router: Router){
  }
  ngOnInit(): void {
  }

  goSearch(){
    this.router.navigate(['/search']);
  }

  goHome(){
    this.router.navigate(['/']);
  }
}