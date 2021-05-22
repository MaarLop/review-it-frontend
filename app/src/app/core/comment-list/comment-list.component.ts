import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { NotificationService } from '../shared/errors/notification.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  comments$ = new BehaviorSubject<Comment[]>([]);
  showSpinner = false;
  formNewComment: FormGroup;
  @Output() newComment = new EventEmitter<Comment>();

  constructor(private fb: FormBuilder, private reviewService: ReviewService, private notifier: NotificationService) { }

  ngOnInit(): void {
    this.startForm();
  }

  onEnter() {
    this.addComment();
  }

  getComments(){
    this.comments$;
  }

  startForm(){
    this.formNewComment = this.fb.group(
      {
        message: [{value: '', disabled: false}],
        reviewId: localStorage.getItem('reviewId'),
        userId: sessionStorage.getItem('userId'),
      }
    )
  }

  addComment(){
    if(this.formNewComment.valid){
      this.reviewService.createComment(this.formNewComment.getRawValue() as Comment).subscribe((comment: Comment) => {
        this.newComment.emit(comment);
        this.startForm();
        const commentList = this.comments$.value;
        this.comments$.next([...commentList, ...[comment]]);
      },
        err => {
          const message = err.error.message ? err.error.message+'\n' : '';
          this.notifier.showError(message);
        }
      );
    }
  }

  onScroll(){
    setTimeout(() => {
        this.getComments();
        this.showSpinner = false;
    }, 2000);
  }

}
