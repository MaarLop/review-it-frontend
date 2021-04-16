import {Component, OnInit, EventEmitter, Output, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-rate-stars',
  templateUrl: 'rate-stats.component.html',
  styleUrls: ['rate-stats.component.scss'],
})
export class RateStarsComponent{
 
  @Output() rateSelected = new EventEmitter<number>();
  @ViewChild('namebutton') namebutton: ElementRef;
  
  constructor(){}

  ngOnInit(): void {
  }
  setRate(rate: number){

    this.namebutton.nativeElement.classList.add('selected')
    setTimeout(() => {
      this.namebutton.nativeElement.classList.remove('selected')
    }, 1000);
    this.rateSelected.emit(rate);
  }

}
