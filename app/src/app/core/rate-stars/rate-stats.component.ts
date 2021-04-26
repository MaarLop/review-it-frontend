import {Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'app-rate-stars',
  templateUrl: 'rate-stats.component.html',
  styleUrls: ['rate-stats.component.scss'],
})
export class RateStarsComponent{
 
  @Output() rateSelected = new EventEmitter<number>();
  currentRate: Number;

  constructor(){ }

  onRateChange(rate: number){
    this.rateSelected.emit(rate);
  }

}
