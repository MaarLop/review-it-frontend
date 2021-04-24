import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import { Review } from '../models/review-model';
import { element } from 'protractor';

@Component({
  selector: 'app-review-card',
  templateUrl: 'review-card.component.html',
  styleUrls: ['review-card.component.scss'],
})

export class ReviewCardComponent implements OnInit{
  @Input() review : Review;
  currentRate: Number;

  constructor(){ 
   }
  
  ngOnInit(): void {
    this.currentRate=this.review.points
  }


}