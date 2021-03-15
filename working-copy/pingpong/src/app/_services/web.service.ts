import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  readonly ROOT_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get<T>(uri: string) {
    return this.http.get<T>(`${this.ROOT_URL}/${uri}`);
  }

  post<T>(uri: string, payload: Object) {
    return this.http.post<T>(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch<T>(uri: string, payload: Object) {
    console.log(`${this.ROOT_URL}/${uri}`);
    return this.http.patch<T>(`${this.ROOT_URL}/${uri}`, payload);
  }
}
