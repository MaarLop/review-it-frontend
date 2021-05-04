import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected path = 'https://dev-d8bhv2ic.us.auth0.com/oauth/token';
  protected basePath = 'http://localhost:8090/users';
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
    body ={ grant_type:"client_credentials",
            client_id:"3hdg1KzxgUSBXq1UTePxjov5dgVKRg9g",
            client_secret:"Jly0qiNOHpU29UTE4DVg7E1gn-oEXWlVpOooNI9hN9F68-PsYWRrMVLJqQHuguy_",
            audience:"https://dev-d8bhv2ic.us.auth0.com/api/v2/"
          };
    
    constructor(private httpClient: HttpClient, private auth: AuthService, @Inject(DOCUMENT) private doc: Document)  { }
        
    getToken(): Observable<any> {
      const path = this.path;
      const headers = this.headers;
      const body = this.body;
      return this.httpClient.post(path, body, { headers });
    }

    signUp(data: any): Observable<any> {
      const headers = this.headers;
      const path = this.basePath + '/signUp';
      return this.httpClient.post(path, {
          name: data.name,
          userName: data.nickname,
          lastName: data.family_name,
          email: data.email,
          password: data.sub,
          avatar: data.picture
      });
    }

}