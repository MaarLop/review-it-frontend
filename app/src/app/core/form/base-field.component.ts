// Este componente es para extender el getter de la lista de errores para luego utilizar
// dentro de los mat-form-field de los distintos componentes del form.

import { defaultValidationErrorMessageBuilders } from './validations';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isRequiredField } from 'src/app/utils/form-functions';

@Component({
  template: ''
})
export abstract class BaseFieldComponent {
  @Input() key: string;
  @Input() group: FormGroup;
  subscriptions: Subscription[] = []

  constructor() { }

  get errorList() {
    if (
      this.group.get(this.key) &&
      this.group.get(this.key).invalid &&
      (this.group.get(this.key).dirty || this.group.get(this.key).touched)
    ) {
      const { errors } = this.group.get(this.key);
      if (!errors) {
        return [];
      }
      return Object.keys(errors).map((errorKey) => ({
        key: errorKey,
        message:
          typeof errors[errorKey] === 'string'
            ? errors[errorKey]
            : defaultValidationErrorMessageBuilders[errorKey](errors[errorKey]),
      }));
    } else {
      return [];
    }
  }

  get isRequiredField(): boolean {
    const isNumerical = typeof this.group.controls[this.key].value === "number";
    const isNotValid = isNumerical ?
      isNaN(this.group.controls[this.key].value) || this.group.controls[this.key].invalid :
      this.group.controls[this.key].value === null || this.group.controls[this.key].invalid;

    return isRequiredField(this.group.controls[this.key]) && isNotValid;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
