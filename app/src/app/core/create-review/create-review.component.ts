import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-review',
  templateUrl: 'create-review.component.html',
  styleUrls: ['create-review.component.scss'],
})


export class CreateReviewComponent implements OnInit {
  @ViewChild('namebutton') namebutton: ElementRef;
  form: FormGroup;
  star_rate = 'star_rate'
  constructor(private fb: FormBuilder){
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        descripcion: [{ value: '', disabled: false }],
      }
    )
  }

  catchRating(something){
    console.log(something, 'esto es el create')
  }

}