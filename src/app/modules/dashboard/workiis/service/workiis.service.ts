import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { environment } from 'src/environments/environment';
import {
	IApplication,
	IApplicationResponse,
	IApplicationUser,
	IPagination,
	IUsersApplicationResponse,
	IWorkiiCreate
} from '../interfaces/workii.interface';

@Injectable({
	providedIn: 'root'
})
export class WorkiisService {
	private http = inject(HttpClient);
	userCurrentId!: string;
	private baseUrl: string = environment.baseUrl;
	private searchCache: { [key: string]: IWorkii[] } = {};

	createAuthorizationHeader(): HttpHeaders {
		const token = localStorage.getItem('authToken');
		return new HttpHeaders({ Authorization: `Bearer ${token}` });
	}

	getWorkiis({ limit, offset }: IPagination): Observable<{ workiis: IWorkii[]; totalResults: number }> {
		const url = `${this.baseUrl}/workiis`;
		const headers = this.createAuthorizationHeader();

		const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

		return this.http.get<{ workiis: IWorkii[]; totalResults: number }>(url, { headers: headers, params });
	}

	getWorkii(slug: string): Observable<IWorkii> {
		const url = `${this.baseUrl}/workiis/${slug}`;
		const headers = this.createAuthorizationHeader();

		return this.http.get<IWorkii>(url, { headers: headers });
	}

	getUsersApplyWorkii(workii: string, { limit, offset }: IPagination): Observable<IUsersApplicationResponse[]> {
		const url = `${this.baseUrl}/applications/users/${workii}`;
		const params = {
			limit: limit.toString(),
			offset: offset.toString()
		};

		return this.http.get<IUsersApplicationResponse[]>(url, { params });
	}

	createWorkiis({
		name,
		target,
		description,
		toDoList,
		cost,
		executionTime,
		userId,
		...rest
	}: IWorkiiCreate): Observable<IWorkii> {
		const url = `${this.baseUrl}/workiis`;
		const headers = this.createAuthorizationHeader();
		const body = { name, target, description, toDoList, cost, executionTime, userId };

		return this.http.post<IWorkii>(url, body, { headers });
	}

	applyToWorkii({ user, workii }: IApplication): Observable<IApplication> {
		const url = `${this.baseUrl}/workiis/application`;
		const headers = this.createAuthorizationHeader();

		console.log(user, workii);

		return this.http.post<IApplication>(url, { user, workii }, { headers });
	}

	getAllApplicationsWorkiiByUser(id: string, { limit, offset }: IPagination): Observable<IApplicationUser[]> {
		const url = `${this.baseUrl}/applications/user/${id}`;

		const params = {
			limit: limit.toString(),
			offset: offset.toString()
		};

		return this.http.get<IApplicationUser[]>(url, { params });
	}

	searchWorkiis(
		searchTerm: string,
		limit: number,
		offset: number
	): Observable<{ workiis: IWorkii[]; totalSearchResults: number }> {
		const url = `${this.baseUrl}/workiis/search`;
		const headers = this.createAuthorizationHeader();
		const params = new HttpParams()
			.set('searchTerm', searchTerm)
			.set('limit', limit.toString())
			.set('offset', offset.toString());

		return this.http.get<{ workiis: IWorkii[]; totalSearchResults: number }>(url, { params, headers });
	}

	removeApplication(id: string, workii: string): Observable<IApplicationResponse> {
		const url = `${this.baseUrl}/workiis/apply/${id}`;
		const headers = this.createAuthorizationHeader();

		const body = {
			workii
		};

		return this.http.delete<IApplicationResponse>(url, { body, headers });
	}

	deleteWorkii(id: string): Observable<IApplicationResponse> {
		const url = `${this.baseUrl}/workiis/${id}`;
		const headers = this.createAuthorizationHeader();

		return this.http.delete<IApplicationResponse>(url, { headers });
	}
}
