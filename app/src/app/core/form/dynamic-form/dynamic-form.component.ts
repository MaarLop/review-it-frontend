import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { FieldConfig, ActionConfig } from '../field.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() fieldsConfig: FieldConfig[];
  @Input() actionsConfig: ActionConfig[];
  @Input() buttonsConfig?: any[];
  @Input() form$: Observable<FormGroup>;
  @Input() title: string;
  @Input() isEditMode$: Observable<boolean>;
  @Output() submitForm = new EventEmitter<string>();
  @Output() closeForm = new EventEmitter();
  @Input() isSmallSize = false;

  currentForm$ = new BehaviorSubject<FormGroup>(null);
  subscriptions: Subscription[] = [];
  isEdit: boolean;

  constructor() { }

  ngOnInit() {
    this.subscriptions.push(this.form$.subscribe(this.currentForm$));
    this.subscriptions.push(
      this.isEditMode$.subscribe((x) => (this.isEdit = x)),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.currentForm$.value.valid) {
      const controlKeys = Object.keys(this.currentForm$.value.controls);
      controlKeys.forEach((ck) => {
        if (this.currentForm$.value.get(ck).disabled) {
          this.currentForm$.value.get(ck).enable();
        }
      });
      this.submitForm.emit(this.currentForm$.value.value);
    }
  }

  getInputProperties(fieldConfig: FieldConfig) {
    return {
      ...fieldConfig.inputProperties,
      group: this.currentForm$.value,
      key: fieldConfig.key,
    };
  }

  getOutputProperties(fieldConfig: FieldConfig) {
    return {
      ...fieldConfig.outputProperties,
    };
  }
}
