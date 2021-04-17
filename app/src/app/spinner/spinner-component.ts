import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner-component.html',
  styleUrls: ['./spinner-component.scss']
})

export class SpinnerComponent implements OnInit{
 loading= false;

  constructor(){
  }
    ngOnInit(): void {
    }
}