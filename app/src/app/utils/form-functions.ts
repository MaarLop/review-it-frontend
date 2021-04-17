import { AbstractControl } from '@angular/forms';

export const isRequiredField = (abstractControl: AbstractControl): boolean => {
    if (abstractControl.validator) {
        // tslint:disable-next-line: no-object-literal-type-assertion
        const validator = abstractControl.validator({} as AbstractControl);
        if (validator && validator.required) {
            return true;
        }
    }
    return false;
};
