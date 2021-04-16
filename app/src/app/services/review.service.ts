import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  
}
