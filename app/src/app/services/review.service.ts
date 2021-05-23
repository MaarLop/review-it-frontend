import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../core/models/review-model';
import { Comment } from '../core/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  protected basePath = 'http://localhost:8090/reviews';
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
  });

  constructor(private httpClient: HttpClient) { }

  public getReviews(size?:number, page?: number, filter?: string) : Observable<any> {
    const pageAndSize = size === null && page === null ? '' : `&page=${page}&size=${size}`;
    const endpoint = filter === null || filter === '' ? '' : `&${filter}`;
    const path = `${this.basePath}?sort=id&order=desc${pageAndSize}${endpoint}`;
    return this.httpClient.get(path, { 
      headers: this.headers 
    });
  }

  public save(body: Review){
    const path = this.basePath;
    const headers = this.headers;
    return this.httpClient.post(path, body, { headers });
  }

  public getComments(id: any, page?: number): Observable<any>{
    const headers = this.headers;
    const path = `${this.basePath}/${id}/comments?sort=id&order=desc&page=${page}&size=5`;
    return this.httpClient.get(path, { headers });
  }

  public createComment(body: Comment) {
    const path = this.basePath + '/createCommentary';
    const headers = this.headers;
    return this.httpClient.post(path, body, { headers });
  }
  
}
