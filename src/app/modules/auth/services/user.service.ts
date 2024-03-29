import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { IUserDto } from 'src/app/core/models/user.interface';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private http = inject(HttpClient);

	public getCurrentUser(): any {
		const token = localStorage.getItem('authToken');
		if (token) {
			const decodedToken: { id: string } = jwt_decode(token);

			return decodedToken['id'];
		}
		return null;
	}

	getUser(id: string): Observable<IUserDto> {
		const url = `/users/${id}`;

		return this.http.get<IUserDto>(url);
	}
}
