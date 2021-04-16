import {
  diasEnMilisegundos,
  restarDias,
  restarDiasDelActual,
  formatearFechaYYYYmmdd,
} from './date-functions';

describe('Restar N dias', () => {
  it('should return the same date it was passed, because amount of days to substract is 0', () => {
    const originalDate = new Date('1964-02-02');
    const result = restarDias(originalDate, 0);
    expect(result).toEqual(originalDate);
  });

  it('should return the same date it was passed, because amount of days to substract is negative', () => {
    const originalDate = new Date('1964-02-02');
    const result = restarDias(originalDate, -2);
    expect(result).toEqual(originalDate);
  });

  it('should return a new date with the given amount of days substracted, with an error margin of 20 secconds', () => {
    const originalDate = new Date('1964-01-01');
    const result = restarDias(originalDate, 12);

    let milisecondsDifference = originalDate.getTime() - result.getTime();
    const twelveDaysInMs = diasEnMilisegundos(12);
    milisecondsDifference -= twelveDaysInMs;

    // valido con un margen de 20 segundos.
    expect(milisecondsDifference).toBeLessThan(10000);
    expect(milisecondsDifference).toBeGreaterThan(-10000);
  });

  it('should return a new date with the given amount of days substracted, with an error margin of 20 secconds (border case)', () => {
    const originalDate = new Date('1964-01-01');
    const result = restarDias(originalDate, 1);

    let milisecondsDifference = originalDate.getTime() - result.getTime();
    milisecondsDifference -= diasEnMilisegundos(1);

    // valido con un margen de 20 segundos.
    expect(milisecondsDifference).toBeLessThan(10000);
    expect(milisecondsDifference).toBeGreaterThan(-10000);
  });

  it('should return a new date with the given amount of days substracted to the current date, with an error margin of 20 secconds', () => {
    const diaActual = new Date();
    const result = restarDiasDelActual(1);

    let milisecondsDifference = diaActual.getTime() - result.getTime();
    milisecondsDifference -= diasEnMilisegundos(1);

    // valido con un margen de 20 segundos.
    expect(milisecondsDifference).toBeLessThan(10000);
    expect(milisecondsDifference).toBeGreaterThan(-10000);
  });
});

describe('Formatear fecha', () => {
  it('should return the same date in YYYY-MM-DD format', () => {
    const givenDateInStringFormat = '2020-05-25';
    const result = formatearFechaYYYYmmdd(new Date(givenDateInStringFormat));

    expect(result).toMatch(givenDateInStringFormat);
  });

  it('should return the same date in YYYY-MM-DD format, border case', () => {
    const givenDateInStringFormat = '2019-12-31';
    const result = formatearFechaYYYYmmdd(new Date(givenDateInStringFormat));

    expect(result).toEqual(givenDateInStringFormat);
  });
});
