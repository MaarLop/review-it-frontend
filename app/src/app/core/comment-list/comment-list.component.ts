import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
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
  page: number = 0;
  finished = false;

  constructor(private fb: FormBuilder, private reviewService: ReviewService, private notifier: NotificationService) { }

  ngOnInit(): void {
    this.getComments();
    this.startForm();
  }

  onEnter() {
    this.addComment();
  }

  getComments(){
    if(this.finished) return;
    this.reviewService.getComments(localStorage.getItem('reviewId'), this.page).subscribe((response) => {
      const commentList = this.page === 0 ? [] : this.comments$.value;
      this.comments$.next([...commentList, ...response.content]);
      this.finished = response.last;
      this.showSpinner = !this.finished;
      this.page+=1;
    });
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
        this.comments$.next([...[comment], ...commentList]);
      },
        err => {
          const message = err.error.message ? err.error.message+'\n' : '';
          this.notifier.showError(message);
        }
      );
    }
  }

  onScroll(){
    if ((window.innerHeight + window.scrollY) === document.body.offsetHeight) {
      this.showSpinner = false;
    }else{
      this.getComments();
    }
  }

}
