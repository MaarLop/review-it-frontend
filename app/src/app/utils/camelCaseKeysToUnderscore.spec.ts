import { camelCaseKeysToUnderscore } from './object';

describe('camelCaseKeysToUnderscore', () => {
  const simpleTestObject = {
    cammelCaseTest: 4,
    cammelCaseTestPartTwo: 'asd',
    nocammelcase: 7,
  };
  const simpleTestObjectSnake = {
    cammel_case_test: 4,
    cammel_case_test_part_two: 'asd',
    nocammelcase: 7,
  };
  const nestedTestObject = {
    thisIsCammelCase: {
      cammelNested: 'Part 1',
      size: 20,
      qty: '50',
    },
  };
  const nestedTestObjectSnake = {
    this_is_cammel_case: {
      cammel_nested: 'Part 1',
      size: 20,
      qty: '50',
    },
  };
  const nestedComplexTestObject = {
    thisIsCammelCase: {
      cammelNested: 'Part 1',
      cammelCase: {
        cammelTwo: 4,
        cammelTestNested: {
          box: 4,
          another: 'asd',
        },
      },
      qty: '50',
    },
  };
  const nestedComplexTestObjectSnake = {
    this_is_cammel_case: {
      cammel_nested: 'Part 1',
      cammel_case: {
        cammel_two: 4,
        cammel_test_nested: {
          box: 4,
          another: 'asd',
        },
      },
      qty: '50',
    },
  };
  const nestedArrayTestObject = {
    thisIsCammelCase: {
      cammelNested: 'Part 1',
      cammelCase: {
        cammelTwo: 4,
        cammelTestNested: {
          box: 4,
          another: 'asd',
        },
      },
      arrayTest: [
        {
          cammelTest: 4,
        },
        {
          nocammel: 5,
        },
      ],
      qty: '50',
    },
  };
  const nestedArrayTestObjectSnake = {
    this_is_cammel_case: {
      cammel_nested: 'Part 1',
      cammel_case: {
        cammel_two: 4,
        cammel_test_nested: {
          box: 4,
          another: 'asd',
        },
      },
      array_test: [
        {
          cammel_test: 4,
        },
        {
          nocammel: 5,
        },
      ],
      qty: '50',
    },
  };
  const arrayTest = [
    {
      name: 'Part 3A',
      size: '10',
      sizeOftheBox: '20',
    },
    {
      currentlyNameOfTheProperty: 'Part 3B',
      size: '5',
      qty: '20',
    },
    {
      name: 'Part 3C',
      size: '7.5',
      amountOfNumberInthebox: '20',
    },
  ];

  const arrayTestSnake = [
    {
      name: 'Part 3A',
      size: '10',
      size_ofthe_box: '20',
    },
    {
      currently_name_of_the_property: 'Part 3B',
      size: '5',
      qty: '20',
    },
    {
      name: 'Part 3C',
      size: '7.5',
      amount_of_number_inthebox: '20',
    },
  ];

  it('00 - should convert keys to snake in simple objects', () => {
    const result = camelCaseKeysToUnderscore(simpleTestObject);
    expect(result).toEqual(simpleTestObjectSnake);
  });

  it('01 - should convert keys to snake in nested objects', () => {
    const result = camelCaseKeysToUnderscore(nestedTestObject);
    expect(result).toEqual(nestedTestObjectSnake);
  });

  it('02 - should convert keys to snake in high level nested objects', () => {
    const result = camelCaseKeysToUnderscore(nestedComplexTestObject);
    expect(result).toEqual(nestedComplexTestObjectSnake);
  });

  it('03 - should convert keys to snake in nested array objects', () => {
    const result = camelCaseKeysToUnderscore(nestedArrayTestObject);
    expect(result).toEqual(nestedArrayTestObjectSnake);
  });

  it('04 - should convert keys to snake nested in array objects', () => {
    const result = camelCaseKeysToUnderscore(nestedArrayTestObject);
    expect(result).toEqual(nestedArrayTestObjectSnake);
  });

  it('05 - should convert keys to snake in arrays', () => {
    const result = camelCaseKeysToUnderscore(arrayTest);
    expect(result).toEqual(arrayTestSnake);
  });
});
