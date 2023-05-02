import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, map, of, tap, Observable, Subject, BehaviorSubject } from 'rxjs';
import { IApplication, IApplicationResponse, IApplicationUser, IPagination, IUsersApplicationResponse, IWorkiiCreate } from '../interfaces/workii.interface';
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
  private searchCache: { [key: string]: IWorkii[] } = {};

  constructor(private http: HttpClient,
    private userService: UserService) {

    // Obtener el token de autorización
    const token = localStorage.getItem('token');

    // Crear el encabezado de la solicitud HTTP
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  getWorkiis({ limit, offset }: IPagination): Observable<IWorkii[]> {
    const url = `${this.baseUrl}/workiis`;
    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };

    return this.http.get<IWorkii[]>(url, { headers: this.headers, params })
  }

  getWorkii(slug: string): Observable<IWorkii> {
    const url = `${this.baseUrl}/workiis/${slug}`;


    return this.http.get<IWorkii>(url, { headers: this.headers })
  }

  getUsersApplyWorkii(workii: string, { limit, offset }: IPagination) {

    const url = `${this.baseUrl}/applications/users/${workii}`;
    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };

    return this.http.get<IUsersApplicationResponse[]>(url, { params })
  }


  createWorkiis({ name, target, description, toDoList, cost, executionTime, userId, ...rest }: IWorkiiCreate) {
    const url = `${this.baseUrl}/workiis`;
    const body = { name, target, description, toDoList, cost, executionTime, userId }

    return this.http.post<IWorkii>(url, body, { headers: this.headers })
  }

  applyToWorkii({ user, workii }: IApplication) {
    const url = `${this.baseUrl}/workiis/application`;

    console.log(user, workii);


    return this.http.post<IApplication>(url, { user, workii }, { headers: this.headers })
  }

  getAllApplicationsWorkiiByUser(id: string, { limit, offset }: IPagination): Observable<IApplicationUser[]> {
    const url = `${this.baseUrl}/applications/user/${id}`;

    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };

    return this.http.get<IApplicationUser[]>(url, { params })
  }

  searchWorkiis(searchTerm: string, limit: number, offset: number): Observable<{ workiis: IWorkii[], totalResults: number }> {
    const url = `${this.baseUrl}/workiis/search`;
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<{ workiis: IWorkii[], totalResults: number }>(url, { params, headers: this.headers });
  }

  removeApplication(id: string, workii: string) {
    const url = `${this.baseUrl}/workiis/apply/${id}`;

    const body = {
      workii
    }

    return this.http.delete<IApplicationResponse>(url, { body, headers: this.headers })
  }

  deleteWorkii(id: string) {
    const url = `${this.baseUrl}/workiis/${id}`;

    return this.http.delete<IApplicationResponse>(url, { headers: this.headers })
  }
}
