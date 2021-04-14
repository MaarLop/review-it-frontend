import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReviewCardComponent } from './review-card/review-card.component'
import { MatCardModule } from '@angular/material/card';
import { CreateReviewComponent } from './create-review/create-review.component';

@NgModule({
  declarations: [
    ReviewCardComponent,
    CreateReviewComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
  ],
  exports:[
    ReviewCardComponent,
    CreateReviewComponent
  ],
  providers: [],
  bootstrap: []
})
export class CoreModule { }
