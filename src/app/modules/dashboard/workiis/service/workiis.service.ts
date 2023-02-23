import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, of, tap, Observable } from 'rxjs';
import { IWorkii } from '../interfaces/workii.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkiisService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient, ) { }


  getWorkiis(limit: number = 2, offset: number = 0, headers: HttpHeaders): Observable<IWorkii[]> {
    const url = `${this.baseUrl}/workiis`;
    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };

    return this.http.get<IWorkii[]>(url, {headers, params})
  }


}
