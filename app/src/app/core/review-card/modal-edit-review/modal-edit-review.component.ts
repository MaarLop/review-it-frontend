import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from 'src/app/services/review.service';
import Swal from 'sweetalert2';
import { Review } from '../../models/review-model';
import { NotificationService } from '../../shared/errors/notification.service';

@Component({
  selector: 'app-modal-edit-review',
  templateUrl: './modal-edit-review.component.html',
  styleUrls: ['./modal-edit-review.component.scss']
})
export class ModalEditReviewComponent implements OnInit {

  formReview: FormGroup;
  modal : NgbModalRef;
  @Input() review : Review;
  currentRate: Number;

  constructor(private fb: FormBuilder, private reviewService: ReviewService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.startForm();
    this.currentRate=this.review.points;
  }

  close(){
    this.modal.close();
  }

  catchRating(){
    this.formReview.get('points').setValue(this.currentRate);
  }

  startForm(){
    this.formReview = this.fb.group(
      {
        id: [{value: this.review.id, disabled: true}],
        title: [{value: this.review.title, disabled: true}],
        description: [{value: this.review.description, disabled: false}],
        points: [{value: this.review.points, disabled: false}]
      }
    )
  }

  update(){
    if(this.formReview.valid){
      this.reviewService.modify(this.formReview.getRawValue() as Review).subscribe((review: Review) => {
        this.modal.close();
        this.notificationService.showSuccess('Su reseña está siendo actualizada..');
      },
        err => {
          let first = err.error.description ? err.error.description+'\n' : '';
          const second = err.error.points ? err.error.points : '';
          first = !err.error.description && !err.error.points ? err.error : first;
          Swal.fire({
            icon: 'error',
            html:first+'</br>'+second,
          })
        }
      );
    }
  }

}
