import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getJwtToken(): string | null {

    return localStorage.getItem('token') ? localStorage.getItem('token') : null

  }

  public getCurrentUser(): any {
    const token = this.getJwtToken();
    if (token) {
      const decodedToken: {id: string} = jwt_decode(token);
      return decodedToken['id'];
    }
    return null;
  }
}
