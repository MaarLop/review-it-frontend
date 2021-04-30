import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../core/models/review-model';

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

  public getReviews(size?:number, page?: number) : Observable<any> {
    const pageAndSize = size === null && page === null ? '' : `&page=${page}&size=${size}`;
    const path = `${this.basePath}?sort=id&order=desc${pageAndSize}`;
    return this.httpClient.get(path, { 
      headers: this.headers 
    });
  }

  public save(body: Review){
    const path = this.basePath + '/save';
    return this.httpClient.post(path, body);
  }
  
}
