import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FieldConfig } from '../field.interface';
import { BaseFieldComponent } from '../base-field.component';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent extends BaseFieldComponent {
  @Input() label: string;
  @Input() maxDate?: Date;
  @Input() minDate?: Date;

  constructor() {
    super();
  }

  static getFieldConfig = (params: {
    key: string;
    label: string;
    defaultValue?: any;
    validators?: ValidatorFn | ValidatorFn[];
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
    maxDate?: Date;
    minDate?: Date;
  }): FieldConfig => ({
    key: params.key,
    component: DateComponent,
    validators: params.validators,
    asyncValidators: params.asyncValidators,
    inputProperties: {
      label: params.label,
      maxDate: params.maxDate,
      minDate: params.minDate,
    },
    value: params.defaultValue,
  });
}
