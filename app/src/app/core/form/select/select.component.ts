import { Component, Input, OnInit } from '@angular/core';
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
export class SelectComponent extends BaseFieldComponent implements OnInit{
  @Input() label: string;
  @Input() options$: Observable<SimpleOption[]>;
  @Input() disabled$: Observable<boolean>;
  @Input() defaultValue?: any;

  constructor() {
    super();
  }

  ngOnInit() {
    if(this.defaultValue){
      this.group.get(this.key).setValue(this.defaultValue.id);
    }
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
