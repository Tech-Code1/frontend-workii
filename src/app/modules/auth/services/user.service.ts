import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { IUserDTO } from 'src/app/core/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)

  private baseUrl: string = environment.baseUrl;

  constructor() { }

  public getCurrentUser(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: {id: string} = jwt_decode(token);

      return decodedToken['id'];
    }
    return null;
  }

  getUser(id: string) {
    const url = `${this.baseUrl}/users/${id}`;

    return this.http.get<IUserDTO>(url)
  }
}
