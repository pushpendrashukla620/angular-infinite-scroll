import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PageResponse<T> {
  totalPages: number;
  page: number;
  content: T[];
}


@Injectable({
  providedIn: 'root'
})
export class ApiCall {
  constructor(private http: HttpClient) {
  }
  private baseUrl = 'http://localhost:8080/api/numbers'; // your backend URL

  getNumbers<T> (page: number, size: number): Observable<PageResponse<T>> {
    return this.http.get<PageResponse<T>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }
}
