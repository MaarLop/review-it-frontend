import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Pageable } from '../core/models/pageable.model';
import { User } from '../core/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected path = 'https://dev-d8bhv2ic.us.auth0.com/oauth/token';
  protected basePath = 'http://localhost:8090/users';
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
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

    login(data: any): Observable<any> {
      const headers = this.headers;
      const path = this.basePath + '/login';
      return this.httpClient.post(path, {
          name: data.given_name,
          userName: data.nickname,
          lastName: data.family_name,
          email: data.email,
          password: data.sub,
          avatar: data.picture
      });
    }

    public save(body: FormData){
      const path = this.basePath;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
      });
      return this.httpClient.post(path, body, { headers });
    }

    public getImage(userName: string): Observable<any>{
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
      });
      const path = this.basePath + `/avatar/${userName}`;
      return this.httpClient.get(path, { headers, responseType: "blob"});
    }

    public get(id: any): Observable<any>{
      const path = this.basePath + '/info';
      const headers = this.headers;
      const body = id;
      return this.httpClient.post(path, body, { headers });
    }

    public getByUsername(userName: string): Observable<any> {
      const path = this.basePath + `/profile/${userName}`;
      const headers = this.headers;
      return this.httpClient.get(path, { headers });
    }

    public followUser(body: any){
      const path = this.basePath + `/follow`;
      const headers = this.headers;
      return this.httpClient.post(path, body, { headers })
    }

    public unfollowUser(body: any){
      const path = this.basePath + `/unfollow`;
      const headers = this.headers;
      return this.httpClient.post(path, body, { headers })
    }

    public getFollowers(userName: string){
      const path = this.basePath + `/followers/${userName}`;
      return this.httpClient.get(path, { 
        headers: this.headers 
      });
    }

    public getUsers(size?:number, page?: number, filter?: string): Observable<any>{
      const pageAndSize = size === null && page === null ? '' : `&page=${page}&size=${size}`;
      const endpoint = filter === null || filter === '' ? '' : `&search=${filter}`;
      const path = `${this.basePath}?sort=id&order=desc${pageAndSize}${endpoint}`;
      return this.httpClient.get(path,{
        headers:this.headers
      });
    }

    public getFollowings(userName: string){
      const path = this.basePath + `/followings/${userName}`;
      return this.httpClient.get(path,{
        headers:this.headers
      });
    }

    public getFollowingsAll(userName: string): Observable<any> {
      const path = this.basePath + `/followingsAll/${userName}`;
      return this.httpClient.get(path,{
        headers:this.headers
      });
    }

    public getLikesTo(userName: string): Observable<any> {
      const path = this.basePath + `/likes/to/${userName}`;
      return this.httpClient.get(path,{
        headers:this.headers
      });
    }

    public getMessages(userNameTo: string, userNameFrom: string): Observable<any> {
      const path = this.basePath + `/messages/${userNameTo}/${userNameFrom}`;
      return this.httpClient.get(path,{
        headers:this.headers
      });
    }
    
    public getReviews(userName: string): Observable<any> {
      const path = this.basePath + `/${userName}/reviews/`;
      return this.httpClient.get(path,{
        headers:this.headers
      });
    }

    public denounce(body: any){
      const path = this.basePath + `/denounce`;
      const headers = this.headers;
      return this.httpClient.post(path, body, { headers })
    }
}
