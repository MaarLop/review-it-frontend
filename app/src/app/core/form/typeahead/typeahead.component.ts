import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { filter } from 'rxjs/internal/operators/filter';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap, finalize } from 'rxjs/operators';
import { ValidatorFn, } from '@angular/forms';
import { BaseFieldComponent } from '../base-field.component';
import { FieldConfig } from '../field.interface';
import { SimpleOption } from '../../models/simple-option';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent extends BaseFieldComponent
  implements OnInit, OnDestroy {
  @Input() defaultValue$: Observable<string>;
  @Input() isLoading = false;
  @Input() label: string;
  @Input() fetchItems: (text: string) => Observable<SimpleOption[]>;
  items: SimpleOption[] = null;
  defaultValue: string;
  defaultValueSubscription: Subscription;

  static getFieldConfig = (params: {
    key: string;
    label?: string;
    fetchItems: any;
    validators?: ValidatorFn | ValidatorFn[];
    defaultValue$?: Observable<string>;
  }): FieldConfig => ({
    key: params.key,
    component: TypeaheadComponent,
    validators: params.validators,
    inputProperties: {
      label: params.label,
      fetchItems: params.fetchItems,
      defaultValue$: params.defaultValue$,
    },
  });

  // Se implementa segun idea aca https://github.com/angular/components/issues/4863#issuecomment-496570865
  // Porque el problema de tener display value pero devolver key es un issue conocido de
  // Typeahead de Angular materials, todavía no resuelto:
  // Ver también https://github.com/angular/components/issues/9293
  displayFn(): (id: number) => string {
    return (id: number) => {
      if (!id) {
        return '';
      }
      return Array.isArray(this.items)
        ? this.items.find((option) => option.id === id).descripcion
        : this.defaultValue;
    };
  }

  ngOnInit(): void {
    this.group.controls[this.key].valueChanges
      .pipe(
        filter((x: string) => x && x.length > 0),
        debounceTime(300),
        tap(() => (this.isLoading = true)),
        switchMap((text) =>
          this.fetchItems(text).pipe(finalize(() => (this.isLoading = false))),
        ),
        tap((_) => {
          if (typeof this.group.controls[this.key].value === 'string') {
            this.group.controls[this.key].setErrors({ invalidSelect: true });
          }
        }),
      )
      .subscribe((items) => (this.items = items));
    // Se necesita reaccionar cuando llega un default value, reseteando el valor del form control,
    // para forzar la llamada a displayFn y que se muestre el valor correspondiente
    this.defaultValueSubscription = this.defaultValue$?.subscribe((x) => {
      this.defaultValue = x;
      this.group.controls[this.key].setValue(
        this.group.controls[this.key].value,
      );
    });
  }

  ngOnDestroy(): void {
    this.defaultValueSubscription?.unsubscribe();
  }
}
