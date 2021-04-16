import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import { Dictionary } from '../models/dictionary.model';

export interface FieldConfig {
  key?: string;
  component?: any;
  value?: any;
  readonly?: boolean;
  customFilter?: string;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  inputProperties?: Dictionary<any>;
  outputProperties?: Dictionary<any>;
  childrenFields?: Dictionary<FieldConfig>;
}

export interface ActionConfig {
  component?: any;
  inputProperties?: Dictionary<any>;
  outputProperties?: Dictionary<any>;
}
