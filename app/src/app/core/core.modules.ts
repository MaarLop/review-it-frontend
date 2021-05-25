import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { ScrollToTopComponent } from './scroll-up/scroll.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { SpinnerComponent } from './spinner/spinner-component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiClientService } from './api-client.service';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './errors/http-error.interceptor';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

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
    ScrollToTopComponent,
    ReviewListComponent,
    SpinnerComponent,
    SpinnerComponent,
    CommentComponent,
    CommentListComponent
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
    NgbModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    PickerModule 
  ],
  providers: [
    DynamicFormService,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ApiClientService,
    { 
      // processes all errors
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler 
    },
    { 
      // interceptor for HTTP errors
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpErrorInterceptor, 
      multi: true // multiple interceptors are possible
    }
  ],
  exports: [
    SpinnerComponent,
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
    RateStarsComponent,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    ReviewListComponent,
    SpinnerComponent,
    FormsModule
  ],
})
export class CoreModule {}
