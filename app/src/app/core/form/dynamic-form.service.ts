import { Injectable } from '@angular/core';
import { FieldConfig } from './field.interface';
import { FormGroup, FormBuilder, ValidatorFn } from '@angular/forms';
import { Model } from '../models/model.model';

@Injectable()
export class DynamicFormService {
  constructor(protected formBuilder: FormBuilder) { }

  createForm(fcs: FieldConfig[], instance: any, formGeneralValidators?: ValidatorFn[]): FormGroup {
    let formGroup = this.formBuilder.group({}, { validators: formGeneralValidators });
    fcs.forEach((field) => {
      if (field.key == null) {
        return;
      }
      if (field.childrenFields != null) {
        const group = this.formBuilder.group({});
        for (const key of Object.keys(field.childrenFields)) {
          const childControl = this.formBuilder.control(
            field.childrenFields[key].value,
            field.childrenFields[key].validators
              ? field.childrenFields[key].validators
              : [],
          );
          group.addControl(key, childControl);
        }
        if (field.asyncValidators) {
          group.setAsyncValidators(field.asyncValidators);
        }
        formGroup.addControl(field.key, group);
        return;
      }
      const control = this.formBuilder.control(
        field.value,
        field.validators ? field.validators : [],
        field.asyncValidators ? field.asyncValidators : [],
      );
      formGroup.addControl(field.key, control);
    });
    if (instance.id > 0) {
      formGroup = this.updateForm(formGroup, instance);
    }
    return formGroup;
  }

  updateForm(form: FormGroup, instance: Model): FormGroup {
    // Actualiza el valor de todos los controls, pero es un workaround específico para el caso de los que tienen asyncValidator
    // ya que de otro modo congelan el estado del form en PENDING hasta que se los modifique. (GD-223)
    setTimeout(() => {
      if (form.value) {
        form.setValue(form.value);
      }
    }, 0);
    const { id, ...data } = instance;
    // Necesario para mapear los getters de la instancia
    // que al no ser enumerables no son procesados por el patchValue
    Object.keys(instance.constructor.prototype)
      .filter((name) => {
        return (
          typeof Object.getOwnPropertyDescriptor(
            instance.constructor.prototype,
            name,
          ).get === 'function'
        );
      })
      .forEach((prop) => (data[prop] = instance[prop]));
    for (const key of Object.keys(form.controls)) {
      if (form.controls[key] instanceof FormGroup) {
        form.controls[key].patchValue(data);
      }
    }
    form.patchValue(data);
    return form;
  }
}
