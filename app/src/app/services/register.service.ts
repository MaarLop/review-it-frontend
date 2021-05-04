import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  protected basePath = 'http://localhost:8090/users';

  constructor(private httpClient: HttpClient) { }

  singUp(data: any): Observable<any> {
    const path = this.basePath + '/signUp';
    return this.httpClient.post(path, {
        name: data.name,
        lastName: data.lastName,
        userName: data.nickname,
        email: data.email,
        password: "pass",
        avatar: data.picture
    });
}
}
