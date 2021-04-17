import { BehaviorSubject, Subject, of } from 'rxjs';
import {
  map,
} from 'rxjs/operators';
import { FormGroup, ValidatorFn } from '@angular/forms';

import { ActionConfig, FieldConfig } from './field.interface';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { DynamicFormService } from './dynamic-form.service';
import { Model } from '../models/model.model';
import { Dictionary } from '../models/dictionary.model';

export abstract class BaseFormService<T extends Model> {
  /**
   * instancia que está siendo creada o editada, al ser seleccionada desde el listado.
   * Por ahora no se está guardando en el state, sino que se maneja internamente dentro
   * del servicio, mientras sea suficiente.
   */
  public currentInstance$ = new BehaviorSubject<T>(null);
  public form$ = new BehaviorSubject<FormGroup>(null);
  protected reload$ = new Subject<boolean>();
  filterFieldsConfig?: FieldConfig[] = null;
  formFieldsConfig: FieldConfig[];
  buttonsFieldsConfig;
  formGeneralValidators: ValidatorFn[] = null;
  currentForm: FormGroup;
  isFormOpen$ = this.currentInstance$.pipe(map((ci) => ci != null));
  isEditMode$ = this.currentInstance$.pipe(
    map((ci) => ci != null && ci.id > 0),
  );
  public isSmallSize = false;

  initialActionsConfig: ActionConfig[] = [
    DeleteButtonComponent.getFieldConfig({
      label: 'Borrar',
      disabled$: this.isEditMode$.pipe(map((x) => !x)),
      clicked: () => this.deleteSelected(),
    }),
    {
      component: SubmitButtonComponent,
      inputProperties: {
        label: 'Guardar',
      },
    },
  ];

  actionsConfig$ = of(this.initialActionsConfig);

  constructor(
    public formService: DynamicFormService,
    protected model: new () => T,
  ) {}

  reload() {
    this.reload$.next(true);
  }

  /**
   *
   * @param instance Permite modificar valores en la instancia que
   * será posteada. Puede ser sobreescrito en las clases que extienden
   * este servicio para modificar la información que se está posteando
   */
  processInstanceBeforeSave(instance: T): T {
    return instance;
  }

  save(formValue: any) {
    let instance = formValue as T;
    instance = this.processInstanceBeforeSave(instance);
    if (instance) {
      if (this.currentInstance$.value && this.currentInstance$.value.id > 0) {
        instance.id = this.currentInstance$.value.id;
        // this.entityCollectionService.update(instance);
      } else {
        // this.entityCollectionService.add(instance);
      }
    }
  }

  show(instance: T = null) {
    if (instance == null) {
      instance = new this.model();
    }
    instance = Object.assign(new this.model(), instance);
    this.currentInstance$.next(instance);
    this.currentForm = this.formService.createForm(
      this.formFieldsConfig,
      instance,
      this.formGeneralValidators,
    );
    this.form$.next(this.currentForm);
    this.reload$.next(false);
  }

  close() {
    this.currentInstance$.next(null);
    this.currentForm = null;
    this.form$.next(null);
    this.reload$.next(false);
  }

  deleteSelected() {
    if (this.currentInstance$.value && this.currentInstance$.value.id > 0) {
      const titulo = `¿ Está seguro que desea eliminar ${
        // tslint:disable-next-line:no-string-literal
        this.currentInstance$.value.constructor['modelGender'] === 'M'
          ? 'el'
          : 'la'
        // tslint:disable-next-line:no-string-literal
      } ${this.currentInstance$.value.constructor['modelName']} ?`;

      const mensaje = `Una vez borrad${
        // tslint:disable-next-line:no-string-literal
        this.currentInstance$.value.constructor['modelGender'] === 'M'
          ? 'o'
          : 'a'
      } no podrá recuperarse`;

      // this.modalService
      //   .openDialogConfirmation(titulo, mensaje)
      //   .pipe(
      //     take(1),
      //     filter((x) => x?.submitClicked === true),
      //   )
      //   .subscribe(() => {
      //     // this.entityCollectionService.delete(this.currentInstance$.value);
      //   });
    }
  }

  public abstract dispose();

  setContext(args: Dictionary<any>): void {}
}
