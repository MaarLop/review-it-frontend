import { formatDate } from '@angular/common';
import {
  ValidatorFn,
  AbstractControl,
  FormGroup,
  ValidationErrors,
  FormControl,
  Validator,
  Form,
} from '@angular/forms';

export function exactLength(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value?.length === length
      ? null
      : { exactLength: { value: control.value, required: length } };
  };
}

export function matches(
  otherField: string,
  otherFieldLabel: string,
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.parent) {
      return null;
    }
    return control.parent.get(otherField).value === control.value ||
      (!control.parent.get(otherField).value && !control.value)
      ? null
      : { matches: { value: control.value, required: otherFieldLabel } };
  };
}

export function isDateAGratherThanB(
  fechaKey: string,
  fechaControlarKey: string,
): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const fecha = control.get(fechaKey);
    const fechaControlar = control.get(fechaControlarKey);

    if (!fecha || !fechaControlar) {
      return null;
    }
    const fechaValue = formatDate(fecha.value, 'yyyy-MM-dd', 'es-AR');

    const fechaControlarValue = formatDate(
      fechaControlar.value,
      'yyyy-MM-dd',
      'es-AR',
    );

    if (fecha && fechaControlar && fechaValue > fechaControlarValue) {
      fechaControlar.setErrors({ minDate: fecha.value });
      return { minDate: fecha.value };
    } else {
      fechaControlar.updateValueAndValidity({
        onlySelf: true,
        emitEvent: false,
      });
      return null;
    }
  };
}

export const fechaPagoValidator: ValidatorFn = (
  control: FormGroup,
): ValidationErrors | null => {
  const tipo = control.get('tipo');
  const fechaEmision = control.get('fechaEmision');
  const fechaPago = control.get('fechaPago');

  if (!tipo || !fechaPago || !fechaEmision) {
    return null;
  }

  const fechaEmisionValue = formatDate(
    fechaEmision.value,
    'yyyy-MM-dd',
    'es-AR',
  );

  const fechaPagoValue = formatDate(fechaPago.value, 'yyyy-MM-dd', 'es-AR');

  const today = formatDate(new Date(), 'yyyy-MM-dd', 'es-AR');

  if (fechaEmision && fechaPago && fechaEmisionValue > fechaPagoValue) {
    fechaPago.setErrors({ minDate: fechaEmision.value });
    return { minDate: fechaEmision.value };
  } else if (
    tipo &&
    fechaPago &&
    tipo.value === 'Diferido' &&
    today >= fechaPagoValue
  ) {
    fechaPago.setErrors({ minDateJustGrather: new Date() });
    fechaPago.markAsTouched();
    return { minDateJustGrather: new Date() };
  } else {
    fechaPago.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    return null;
  }
};

export function validaCuit(control: FormControl): { [key: string]: boolean } {
  let cuit = control.value;
  if (control.dirty && control.value !== '') {
    var cuitlimpio = cuit.toString().replace(/[-_]/g, '');
    var calculado = calcularDigitoCuil(cuitlimpio);
    var digito = parseInt(cuitlimpio[10]);
    var resultado = calculado == digito;

    return resultado ? null : { pattern: true };
  }
}

function calcularDigitoCuil(cuitlimpio) {
  const mult = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let total = 0;
  for (var i = 0; i < mult.length; i++) {
    total += parseInt(cuitlimpio[i]) * mult[i];
  }
  var mod = total % 11;
  var mod1 = 11 - mod;
  if (mod1 == 11) return 0;
  else return mod1;
}
