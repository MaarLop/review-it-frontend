import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidatorFn } from '@angular/forms';
import { FieldConfig } from '..';
import { BaseFieldComponent } from '../base-field.component';
import { SimpleOption } from '../../models/simple-option';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends BaseFieldComponent {
  @Input() label: string;
  @Input() options$: Observable<SimpleOption[]>;
  @Input() disabled$: Observable<boolean>;

  constructor() {
    super();
  }
  static getFieldConfig = (params: {
    key: string;
    label: string;
    options$: Observable<SimpleOption[]>;
    defaultValue?: any;
    disabled$?: Observable<boolean>;
    validators?: ValidatorFn | ValidatorFn[];
  }): FieldConfig => ({
    key: params.key,
    component: SelectComponent,
    inputProperties: {
      label: params.label,
      options$: params.options$,
      disabled$: params.disabled$,
    },
    value: params.defaultValue,
    validators: params.validators,
  });
}
