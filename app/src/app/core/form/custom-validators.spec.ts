import { FormBuilder } from '@angular/forms';

import { matches } from './custom-validators';

describe('maxTextLength', () => {
  const maxTextLengthValidator = matches('password', 'password');
  const fb = new FormBuilder();
  const fg = fb.group({
    password: [''],
    passwordConfirm: ['1234', matches('password', 'password')],
  });
  const controlPassword = fg.get('password');
  const controlVerificacions = fg.get('passwordConfirm');

  it('should return null if password is equals to passwordConfirm', () => {
    controlPassword.setValue('1234');
    expect(maxTextLengthValidator(controlVerificacions)).toEqual(null);
  });

  it('should return error if password doesnt equal to passwordConfirm', () => {
    controlPassword.setValue('123');
    expect(maxTextLengthValidator(controlVerificacions)).toEqual({
      matches: Object({ value: '1234', required: 'password' }),
    });
  });
});
