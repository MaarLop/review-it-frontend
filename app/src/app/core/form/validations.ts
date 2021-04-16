export const defaultValidationErrorMessageBuilders = {
  min: ({ actual, min }) =>
    `El número ${actual} debería ser mayor o igual a ${min}.`,
  max: ({ actual, max }) =>
    `El número ${actual} debería ser menor o igual a ${max}.`,
  money: ({ value }) => `${value} no es un monto de dinero válido.`,
  required: () => 'Campo requerido.',
  summary: () =>
    'No se pudieron aplicar los cambios. Por favor revise los mensajes de error debajo.',
  number: ({ value }) => 'Solo se permiten valores numéricos.',
  matDatepickerParse: () => 'Colocar una fecha válida',
  pattern: () => 'Formato inválido',
  unique: () => 'El valor ya fue utilizado',
  minlength: ({ actualLength, requiredLength }) =>
    `El campo debe contener al menos ${requiredLength} caracteres`,
  maxlength: ({ actualLength, requiredLength }) =>
    `El campo no debe contener más de ${requiredLength} caracteres`,
  invalidSelect: () => 'Seleccione un valor existente',
  exactLength: ({ value, required }) =>
    `El campo debe contener ${required} dígitos`,
  matches: ({ otherField, required }) =>
    `El valor ingresado no coincide con el campo ${required}`,
  minDate: (validDate) =>
    `La fecha debe ser mayor o igual a ${validDate.toLocaleDateString()}`,
  minDateJustGrather: (validDate) =>
    `La fecha debe ser mayor a ${validDate.toLocaleDateString()}`,
};
