import { User } from 'app/entities/user';

const ONE_DAY_MILISECONDS = 1000 * 60 * 60 * 24;
const ONE_MINUTE_MILISECONDS = 1000 * 60;
export class JWTHelper {
  public static parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }

  public static getExpirationDate(token): Date {
    const tokenInfo = this.parseJwt(token);

    return new Date(tokenInfo.exp * 1000);
  }

  public static getUserInfo(token): User {
    const tokenClaims = this.parseJwt(token);
    return new User(
      tokenClaims.user_id,
      tokenClaims.username,
      tokenClaims.first_name,
      tokenClaims.last_name,
      tokenClaims.email,
    );
  }
  public static getRefreshExpirationDate() {
    const currentDate = new Date(Date.now());
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate;
  }

  public static expiresInMinutes(token: string, minutes: number): boolean {
    const parsedToken = this.getExpirationDate(token);
    const currentDate = new Date(Date.now());

    const delta =
      (parsedToken.getTime() - currentDate.getTime()) / ONE_MINUTE_MILISECONDS;

    return delta <= minutes ? true : false;
  }

  public static canRefresh(refreshTokenDue: Date) {
    if (refreshTokenDue === null) {
      return true;
    }
    const currentDate = new Date(Date.now());

    const delta =
      (refreshTokenDue.valueOf() - currentDate.valueOf()) / ONE_DAY_MILISECONDS;

    return delta >= 1;
  }
}
