import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, of, tap, Observable, Subject, BehaviorSubject } from 'rxjs';
import { IApplication, IApplicationResponse, IApplicationUser, IPagination, IWorkiiCreate } from '../interfaces/workii.interface';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../auth/services/user.service';
import { IWorkii } from 'src/app/core/models/workii.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkiisService {

  headers: HttpHeaders;
  userCurrentId!: string;
  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient,
    private userService: UserService) {

    // Obtener el token de autorización
    const token = localStorage.getItem('token');

    // Crear el encabezado de la solicitud HTTP
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    }


  getWorkiis({limit, offset}: IPagination): Observable<IWorkii[]> {
    const url = `${this.baseUrl}/workiis`;
    const params = {
      limit: limit.toString(),
      offset:  offset.toString()
    };

    return this.http.get<IWorkii[]>(url, {headers: this.headers, params})
  }

  getWorkii(slug: string): Observable<IWorkii> {
    const url = `${this.baseUrl}/workiis/${slug}`;


    return this.http.get<IWorkii>(url, {headers: this.headers})
  }


  createWorkiis( { name, target, description, toDoList, cost, executionTime, userId, ...rest } : IWorkiiCreate) {
    const url = `${this.baseUrl}/workiis`;
    const body = { name, target, description, toDoList, cost, executionTime, userId }

    return this.http.post<IWorkii>(url, body, {headers: this.headers})
  }

  applyToWorkii({user, workii}: IApplication) {
    const url = `${this.baseUrl}/workiis/application`;

    console.log(user, workii);


    return this.http.post<IApplication>(url, {user, workii}, {headers: this.headers})
  }

  getAllApplicationsWorkiiByUser(id: string, {limit, offset}: IPagination): Observable<IApplicationUser[]> {
    const url = `${this.baseUrl}/applications/user/${id}`;

    const params = {
      limit: limit.toString(),
      offset:  offset.toString()
    };

    return this.http.get<IApplicationUser[]>(url, {params})
  }

  removeApplication(id: string, workii: string) {
    const url = `${this.baseUrl}/workiis/apply/${id}`;

    const body = {
      workii
    }

    return this.http.delete<IApplicationResponse>(url, {body, headers: this.headers})
  }

  deleteWorkii(id: string) {
    const url = `${this.baseUrl}/workiis/${id}`;

    return this.http.delete<IApplicationResponse>(url, {headers: this.headers})
  }
}
