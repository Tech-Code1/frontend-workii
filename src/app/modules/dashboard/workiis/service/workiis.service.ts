import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, of, tap, Observable, Subject } from 'rxjs';
import { IWorkii } from '../interfaces/workii.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkiisService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient, ) { }


  getWorkiis(limit: number, offset: number, headers: HttpHeaders): Observable<IWorkii[]> {
    const url = `${this.baseUrl}/workiis`;
    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };

    return this.http.get<IWorkii[]>(url, {headers, params})
  }


  createWorkiis( { name, target, description, toDoList, cost, executionTime, userId, ...rest } : IWorkii, headers: HttpHeaders) {
    const url = `${this.baseUrl}/workiis`;
    const body = { name, target, description, toDoList, cost, executionTime, userId }

    return this.http.post<IWorkii>(url, body, {headers})
  }
}
