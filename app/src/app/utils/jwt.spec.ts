import { JWTHelper } from './jwt';

describe('JWTHelper', () => {
  const token =
    // tslint:disable-next-line: max-line-length
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3QiLCJleHAiOjE1OTE3MzI2NTIsImVtYWlsIjoiIiwib3JpZ19pYXQiOjE1OTE3MzA4NTJ9.yCosBJIpaZy1NKSzsgXHqNPGfEYE_DMtJ6xTn9YKXvI';
  it('should parse the token', () => {
    const parsedToken = {
      user_id: 1,
      username: 'test',
      exp: 1591732652,
      email: '',
      orig_iat: 1591730852,
    };
    const resp = JWTHelper.parseJwt(token);
    expect(resp).toEqual(parsedToken);
  });

  it('should parse date right', () => {
    const expectedDate = new Date(1591732652000);
    const result = JWTHelper.getExpirationDate(token);
    expect(result).toEqual(expectedDate);
  });

  it('should return right stop refreshing time', () => {
    let expectedDate = new Date(Date.now());
    expectedDate = new Date(expectedDate.setDate(expectedDate.getDate() + 7));

    const result = JWTHelper.getRefreshExpirationDate();
    const milisecondsDifference = result.getTime() - expectedDate.getTime();

    // valido que la fecha de expiración del token sea en 7 días, con un margen de error de 20 segundos.
    expect(milisecondsDifference).toBeLessThan(10000);
    expect(milisecondsDifference).toBeGreaterThan(-10000);
  });

  it('should return true, because the token is expired', () => {
    const result = JWTHelper.expiresInMinutes(token, 10);
    expect(result).toBeTrue();
  });

  it('should return false, because is a date older than the actual date', () => {
    const mockDate = new Date(1590007432909);
    const result = JWTHelper.canRefresh(mockDate);
    expect(result).toBeFalse();
  });
});
