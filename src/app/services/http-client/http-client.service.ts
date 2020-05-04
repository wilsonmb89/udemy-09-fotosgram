import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  get<T>(endpoint: string, options?: any) {
    const headers = !!options ? new HttpHeaders(options) : null;
    return this._httpClient.get<T>(endpoint, { headers }).toPromise();
  }

  post<T>(endpoint: string, body: any, options?: any) {
    const headers = !!options ? new HttpHeaders(options) : null;
    return this._httpClient.post<T>(endpoint, body, { headers }).toPromise();
  }

  simpleGet(endpoint: string, options?: any) {
    return this._httpClient.get(endpoint, options).toPromise();
  }
}
