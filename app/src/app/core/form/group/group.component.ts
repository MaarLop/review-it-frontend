import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { FieldConfig } from '..';
import { Dictionary } from '../../models/dictionary.model';
import { BaseFieldComponent } from '../base-field.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
})
export class GroupComponent extends BaseFieldComponent
  implements OnInit, OnDestroy {
  @Input() childrenFieldsConfigs: FieldConfig[];
  groupAnidado: FormGroup;
  errors: string[] = [];
  subscriptions: Subscription[] = [];

  constructor() {
    super();
  }

  static getFieldConfig = (params: {
    key: string;
    childrenFields: Dictionary<FieldConfig>;
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  }): FieldConfig => ({
    key: params.key,
    component: GroupComponent,
    asyncValidators: params.asyncValidators,
    childrenFields: params.childrenFields,
    inputProperties: {
      childrenFieldsConfigs: Object.values(params.childrenFields),
    },
  });

  ngOnInit(): void {
    this.groupAnidado = this.group.get(this.key) as FormGroup;
    const controls = Object.values(this.groupAnidado.controls);

    this.subscriptions.push(
      this.groupAnidado.statusChanges
        .pipe(
          distinctUntilChanged(),
          filter(
            (estado) =>
              estado === 'INVALID' && this.groupAnidado.errors !== null,
          ),
        )
        .subscribe((_) => {
          controls.forEach((control) => {
            control.setErrors(this.groupAnidado.errors, { emitEvent: false });
            control.markAsTouched({ onlySelf: true });
          });
          this.errors.push(...Object.keys(this.groupAnidado.errors));
        }),
    );

    controls.forEach((control) => {
      this.subscriptions.push(
        control.statusChanges
          .pipe(filter((estado) => estado === 'VALID'))
          .subscribe((_) => {
            this.errors.forEach((error) => {
              controls.forEach((controlHno) => {
                if (controlHno.errors && controlHno.hasError(error)) {
                  controlHno.setErrors(null);
                }
              });
            });
            this.errors = [];
          }),
      );
    });
  }

  getInputProperties(fieldConfig: FieldConfig) {
    return {
      ...fieldConfig.inputProperties,
      group: this.groupAnidado,
      key: fieldConfig.key,
    };
  }

  getOutputProperties(fieldConfig: FieldConfig) {
    return {
      ...fieldConfig.outputProperties,
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
