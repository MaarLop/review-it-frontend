import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

import {
  DynamicFormService,
  DynamicFormComponent,
  SelectComponent,
  InputComponent,
  SubmitButtonComponent,
  SeparatorComponent,
  DateComponent,
  SelectMultipleComponent,
  DeleteButtonComponent,
  TypeaheadComponent,
  ActionButtonComponent,
  ReadOnlyComponent,
} from './form';
import { LabelTooltipComponent } from './label-tooltip/label-tooltip.component';
import { TextAreaComponent } from './form/text-area/text-area.component';
import { LabelIconComponent } from './label-icon/label-icon.component';
import { GroupComponent } from './form/group/group.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { RateStarsComponent } from './rate-stars/rate-stats.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    DynamicFormComponent,
    SelectComponent,
    InputComponent,
    SubmitButtonComponent,
    SeparatorComponent,
    DateComponent,
    ReadOnlyComponent,
    SelectMultipleComponent,
    DeleteButtonComponent,
    TypeaheadComponent,
    ActionButtonComponent,
    LabelTooltipComponent,
    TextAreaComponent,
    LabelIconComponent,
    GroupComponent,
    ReviewCardComponent,
    CreateReviewComponent,
    RateStarsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,

  ],
  providers: [
    DynamicFormService,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    DynamicFormComponent,
    SelectComponent,
    InputComponent,
    SubmitButtonComponent,
    SeparatorComponent,
    DateComponent,
    ReadOnlyComponent,
    SelectMultipleComponent,
    DeleteButtonComponent,
    TypeaheadComponent,
    LabelTooltipComponent,
    TextAreaComponent,
    LabelIconComponent,
    ReviewCardComponent,
    CreateReviewComponent,
    RateStarsComponent
  ],
})
export class CoreModule {}
