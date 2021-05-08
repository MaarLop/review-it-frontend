import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface RequestOptions {
  resourcePath?: string;
  useInstanceLocation?: boolean;
  // Indica si el servicio debe procesar los errores inesperados mostrando
  // un mensaje o hace un rethrow.
  skipErrorsHandling?: boolean;
}

@Injectable()
export class ApiClientService {
  constructor(private http: HttpClient) { }

  /**
   * Get a plain list of objects, without envelope
   */
  
  simplePost(url: string, body: any, options?: RequestOptions) {
    return this.http
      .post<any>(`${url}`, body)
  }


  get(url: string, options?) {
    return this.http
      .get<any>(`${url}`, {
        responseType: 'json',
      })
  }
}
