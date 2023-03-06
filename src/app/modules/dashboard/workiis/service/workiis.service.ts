import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, of, tap, Observable, Subject, BehaviorSubject } from 'rxjs';
import { IApplication, IApplicationResponse, IApplicationUser, IWorkii, IWorkiiCreate } from '../interfaces/workii.interface';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class WorkiisService {

  userCurrentId!: string;
  private baseUrl: string = environment.baseUrl;
  isApplyWorkiiId!: string[];
  applies!: IApplicationUser[];
  userApplies!: string[];
  private appliesSubject = new BehaviorSubject<IApplicationUser[]>([]);

  constructor( private http: HttpClient,
    private userService: UserService) { }

  ngOnInit() {

    this.userCurrentId = this.userService.getCurrentUser()

    this.findAllApplicationsWorkiiByUser(this.userCurrentId)
    .pipe(
      map(applies => {
        const userApplies = applies.map(apply => apply.workii.id);
        return { applies, userApplies };
      })
    )
    .subscribe(({ applies, userApplies }) => {
      this.applies = applies;
      this.userApplies = userApplies;
      console.log('applies en el servicio:', this.applies);
      console.log('userApplies en el servicio:', this.userApplies);
    });
  }


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

  deleteWorkii(id: string, headers: HttpHeaders) {
    const url = `${this.baseUrl}/workiis/${id}`;

    return this.http.delete<IApplicationResponse>(url, {headers})
  }
}
