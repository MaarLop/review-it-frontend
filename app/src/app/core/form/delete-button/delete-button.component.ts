import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from '..';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent {
  @Input() label: string;
  @Input() disabled$: Observable<boolean>;
  @Output() clicked = new EventEmitter();

  static getFieldConfig = (params: {
    label: string;
    disabled$?: Observable<boolean>;
    clicked?: any;
  }): FieldConfig => ({
    component: DeleteButtonComponent,
    inputProperties: {
      label: params.label,
      disabled$: params.disabled$,
    },
    outputProperties: {
      clicked: params.clicked,
    },
  });

  constructor() {}
}
