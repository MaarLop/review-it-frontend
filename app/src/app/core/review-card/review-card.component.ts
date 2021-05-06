import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import { Review } from '../models/review-model';
import { element } from 'protractor';
import { UserService } from '../../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-review-card',
  templateUrl: 'review-card.component.html',
  styleUrls: ['review-card.component.scss'],
})

export class ReviewCardComponent implements OnInit{
  @Input() review : Review;
  currentRate: Number;

  constructor(private userService: UserService){ 
   }
  
  ngOnInit(): void {
    this.currentRate=this.review.points
  }


}