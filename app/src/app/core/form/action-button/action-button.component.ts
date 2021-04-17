import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from '..';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent {
  @Input() label: string;
  @Input() disabled$: Observable<boolean>;
  @Input() visible$: Observable<boolean>;
  @Input() class = 'buttonContainer';
  @Output() clicked = new EventEmitter();

  static getFieldConfig = (params: {
    label: string;
    disabled$?: Observable<boolean>;
    clicked?: any;
    visible$?: Observable<boolean>;
    class?: string;
  }): FieldConfig => ({
    component: ActionButtonComponent,
    inputProperties: {
      label: params.label,
      disabled$: params.disabled$,
      visible$: params.visible$,
      class: params.class ? params.class : 'buttonContainer'
    },
    outputProperties: {
      clicked: params.clicked,
    },
  });

  constructor() { }
}
