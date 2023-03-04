import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, of, tap, Observable, Subject } from 'rxjs';
import { IApplication, IApplicationResponse, IApplicationUser, IWorkii, IWorkiiCreate } from '../interfaces/workii.interface';
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

  getWorkii(slug: string, headers: HttpHeaders): Observable<IWorkii> {
    const url = `${this.baseUrl}/workiis/${slug}`;


    return this.http.get<IWorkii>(url, {headers})
  }


  createWorkiis( { name, target, description, toDoList, cost, executionTime, userId, ...rest } : IWorkiiCreate, headers: HttpHeaders) {
    const url = `${this.baseUrl}/workiis`;
    const body = { name, target, description, toDoList, cost, executionTime, userId }

    return this.http.post<IWorkii>(url, body, {headers})
  }

  applyToWorkii({user, workii}: IApplication, headers: HttpHeaders) {
    const url = `${this.baseUrl}/workiis/application`;
    const body = {
      user,
      workii
    };

    return this.http.post<IApplicationResponse>(url, body, {headers})
  }

  findAllApplicationsWorkiiByUser(id: string): Observable<IApplicationUser[]> {
    const url = `${this.baseUrl}/applications/user/${id}`;

    return this.http.get<IApplicationUser[]>(url)
  }

  removeApplication(id: string, headers: HttpHeaders) {
    const url = `${this.baseUrl}/workiis/apply/${id}`;

    return this.http.delete<IApplicationResponse>(url, {headers})
  }
}
