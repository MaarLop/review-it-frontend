import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../core/models/review-model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  protected basePath = 'http://localhost:8090/review';

  constructor(private httpClient: HttpClient) { }

  public getReviews() : Observable<any> {
    const path = this.basePath;
    return this.httpClient.get(path);
  }

  public save(body: Review){
    const path = this.basePath + '/save';
    return this.httpClient.post(path, body);
  }
  
}
