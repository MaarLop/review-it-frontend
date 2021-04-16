import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleOption } from '../../models/simple-option';
import { BaseFieldComponent } from '../base-field.component';

@Component({
  selector: 'app-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.scss'],
})
export class SelectMultipleComponent extends BaseFieldComponent {
  @Input() label: string;
  @Input() options$: Observable<SimpleOption[]>;

  constructor() {
    super();
  }

  static getFieldConfig = (params: {
    key: string;
    label: string;
    options$: Observable<SimpleOption[]>;
  }) => ({
    key: params.key,
    component: SelectMultipleComponent,
    inputProperties: {
      label: params.label,
      options$: params.options$,
    },
  });
}
