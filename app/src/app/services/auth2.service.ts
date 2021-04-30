import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Auth2Service {

  protected path = 'https://dev-d8bhv2ic.us.auth0.com/oauth/token';
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
    body ={ grant_type:"client_credentials",
            client_id:"3hdg1KzxgUSBXq1UTePxjov5dgVKRg9g",
            client_secret:"Jly0qiNOHpU29UTE4DVg7E1gn-oEXWlVpOooNI9hN9F68-PsYWRrMVLJqQHuguy_",
            audience:"https://dev-d8bhv2ic.us.auth0.com/api/v2/"
          };
    
    constructor(private httpClient: HttpClient)  { }
        
    login(): Observable<any> {
      const path = this.path;
      const headers = this.headers;
      const body = this.body;
      return this.httpClient.post(path, body, { headers });
    }


}
