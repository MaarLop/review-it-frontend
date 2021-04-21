import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import Swal from 'sweetalert2';
import { Review } from '../models/review-model';

@Component({
  selector: 'app-create-review',
  templateUrl: 'create-review.component.html',
  styleUrls: ['create-review.component.scss'],
})


export class CreateReviewComponent implements OnInit {
  @ViewChild('namebutton') namebutton: ElementRef;
  formNewReview: FormGroup;
  star_rate = 'star_rate';

  @Output() newReview = new EventEmitter<Review>();

  constructor(private fb: FormBuilder, private reviewService: ReviewService){
  }

  ngOnInit(): void {
    this.startForm();
  }

  startForm(){
    this.formNewReview = this.fb.group(
      {
        title: [{value: '', disabled: false}],
        description: [{ value: '', disabled: false }],
        points: [{value: 0}]
      }
    )
  }

  catchRating(rate: number){
    this.formNewReview.get('points').setValue(rate);
  }

  createReview(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    if(this.formNewReview.valid){
      console.log(this.formNewReview.getRawValue())
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Su acción no puede ser revertida.',
        icon: 'warning',
        background: '#a2a6a7',
        showCancelButton: true,
        confirmButtonColor:'#008391',
        confirmButtonText: 'Sí, reseñalo!.',
        cancelButtonText: 'No, aún no.'
      }).then((result) => {
        if (result.value) {
          this.reviewService.save(this.formNewReview.getRawValue() as Review).subscribe((review: Review)=>{
            this.newReview.emit(review);
            this.startForm();
          })
          Toast.fire({
            icon: 'success',
            background: '#a2a6a7',
            title: 'Publicado exitosamente!'
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelada',
            text: 'No se ha realizado la publicación 😟',
            icon: 'error',
            background: '#a2a6a7',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          })
        }
      })
    }
  }

}