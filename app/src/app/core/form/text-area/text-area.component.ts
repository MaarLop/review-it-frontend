import { Component, Input, OnInit } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { FieldConfig } from '..';
import { BaseFieldComponent } from '../base-field.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends BaseFieldComponent {
  @Input() label: string;
  constructor() {
    super();
  }

  static getFieldConfig = (params: {
    key: string;
    label?: string;
    inputType?: string;
    readonly?: boolean;
    validators?: ValidatorFn | ValidatorFn[];
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  }): FieldConfig => ({
    key: params.key,
    component: TextAreaComponent,
    validators: params.validators,
    asyncValidators: params.asyncValidators,
    inputProperties: {
      label: params.label,
      inputType: params.inputType,
    },
  });
}
