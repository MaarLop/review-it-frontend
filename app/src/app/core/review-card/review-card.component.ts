import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import { Review } from '../models/review-model';
import { element } from 'protractor';
import { UserService } from '../../services/user.service';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentComponent } from '../comment/comment.component';
import { ReviewService } from 'src/app/services/review.service';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { NotificationService } from '../shared/errors/notification.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-review-card',
  templateUrl: 'review-card.component.html',
  styleUrls: ['review-card.component.scss'],
})

export class ReviewCardComponent implements OnInit{
  @Input() review : Review;
  currentRate: Number;

  constructor(private reviewService: ReviewService, private userService: UserService, private modalService: NgbModal, private notificationService: NotificationService){ 
   }
  
  ngOnInit(): void {
    this.currentRate=this.review.points;
  }

  comments(){
    if(this.review.id){
      localStorage.setItem('reviewId', this.review.id.toString());
      const modalRef = this.modalService.open(CommentListComponent);
      this.reviewService.get(this.review.id).subscribe(data => {
        const commentList = modalRef.componentInstance.comments$.value;
        modalRef.componentInstance.comments$.next([...commentList, ...data.commentaries]);
      });
    }
    // modalRef.componentInstance.message = 'World'
  }

}