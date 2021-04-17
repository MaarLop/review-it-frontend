import { getProperty } from './keys';

describe('JWTHelper', () => {
  const someObject = {
    part1: {
      name: 'Part 1',
      size: 20,
      qty: '50',
    },
    part2: {
      name: 'Part 2',
      size: '15',
      qty: '60',
    },
    part3: [
      {
        name: 'Part 3A',
        size: '10',
        qty: '20',
      },
      {
        name: 'Part 3B',
        size: '5',
        qty: '20',
      },
      {
        name: 'Part 3C',
        size: '7.5',
        qty: '20',
      },
    ],
  };

  it('should return Part 1', () => {
    const prop = getProperty(someObject, 'part1.name');
    expect(prop).toEqual(someObject.part1.name);
  });

  it('should return 60', () => {
    const prop = getProperty(someObject, 'part2.qty');
    expect(prop).toEqual(someObject.part2.qty);
  });

  it('should return Part 3A', () => {
    const prop = getProperty(someObject, 'part3[0].name');
    expect(prop).toEqual(someObject.part3[0].name);
  });

  it('should work with numbers', () => {
    const prop = getProperty(someObject, 'part1.size');
    expect(prop).toEqual(someObject.part1.size);
  });

  it('should work with not nested keys', () => {
    const prop = getProperty(someObject, 'part1');
    expect(prop).toEqual(someObject.part1);
  });

  it('should work with null key parameter', () => {
    const prop = getProperty(someObject, null);
    expect(prop).toEqual('');
  });

  it('should work with null object parameters', () => {
    const prop = getProperty(null, 'part1');
    expect(prop).toEqual('');
  });

  it('should return undefined whether the property does not exist', () => {
    const prop = getProperty(someObject, 'part1.itdoesnotexist');
    expect(prop).toEqual(undefined);
  });
});
