import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from 'src/app/services/review.service';
import Swal from 'sweetalert2';
import { ComplaintReason } from '../../models/complaintReason.model';
import { ComplaintReview } from '../../models/complaintReview.model';
import { Review } from '../../models/review-model';
import { NotificationService } from '../../shared/errors/notification.service';

@Component({
  selector: 'app-denounce-radio-review',
  templateUrl: './denounce-radio-review.component.html',
  styleUrls: ['./denounce-radio-review.component.scss']
})
export class DenounceRadioReviewComponent implements OnInit {
  
  formComplaintReview: FormGroup;
  modal : NgbModalRef;
  @Input() review : Review;
  reason=ComplaintReason;

  constructor(private fb: FormBuilder, private reviewService: ReviewService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.startForm();
  }

  close(){
    this.modal.close();
  }

  startForm(){
    this.formComplaintReview = this.fb.group(
      {
        userId: sessionStorage.getItem('userId'),
        reviewId: [{value: this.review.id, disabled: false}],
        reason: [{value: '', disabled: false}],
        comment: [{value: '', disabled: false}]
      }
    )
  }

  denounce(){
    if(this.formComplaintReview.valid){
      Swal.fire({
        title: 'Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText: 'Sí, denunciar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.formComplaintReview.get('reason').setValue(this.formComplaintReview.get('reason').value.split('.')[1]);
          this.reviewService.denounce(this.formComplaintReview.getRawValue() as ComplaintReview).subscribe((complaint: ComplaintReview) => {
            //this.newReview.emit(complaint);
            //this.startForm();
            this.close();
            this.notificationService.showSuccessAfter('Denuncia realizada correctamente.');
          },
            err => {
              console.log(err);
              const reason = err.error.reason ? err.error.reason : err.error;
              // Cambiarlo por un modal que notifique el error sin hacer el this.close()
              this.close();
              this.notificationService.showError(reason);
            }
          );
        }
      })
    }
  }

}