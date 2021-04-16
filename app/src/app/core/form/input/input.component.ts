import { Component, Input } from '@angular/core';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { FieldConfig } from '../field.interface';
import { BaseFieldComponent } from '../base-field.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends BaseFieldComponent {
  @Input() label: string;
  @Input() inputType = 'text';
  @Input() readonly = false;

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
    customFilter?: string;
  }): FieldConfig => ({
    key: params.key,
    component: InputComponent,
    validators: params.validators,
    asyncValidators: params.asyncValidators,
    customFilter: params.customFilter,
    inputProperties: {
      label: params.label,
      inputType: params.inputType,
      readonly: params.readonly,
    },
  });
}
