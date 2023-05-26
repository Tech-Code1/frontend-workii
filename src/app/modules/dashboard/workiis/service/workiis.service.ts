import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';
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
	private searchCache: { [key: string]: IWorkii[] } = {};

	getWorkiis({ limit, offset }: IPagination): Observable<{ workiis: IWorkii[]; totalResults: number }> {
		const url = `/workiis`;

		const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

		return this.http.get<{ workiis: IWorkii[]; totalResults: number }>(url, { params });
	}

	getWorkii(slug: string): Observable<IWorkii> {
		const url = `/workiis/${slug}`;

		return this.http.get<IWorkii>(url);
	}

	getUsersApplyWorkii(workii: string, { limit, offset }: IPagination): Observable<IUsersApplicationResponse[]> {
		const url = `/applications/users/${workii}`;
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
		const url = `/workiis`;
		const body = { name, target, description, toDoList, cost, executionTime, userId };

		return this.http.post<IWorkii>(url, body);
	}

	applyToWorkii({ user, workii }: IApplication): Observable<IApplication> {
		const url = `/workiis/application`;

		console.log(user, workii);

		return this.http.post<IApplication>(url, { user, workii });
	}

	getAllApplicationsWorkiiByUser(id: string, { limit, offset }: IPagination): Observable<IApplicationUser[]> {
		const url = `/applications/user/${id}`;

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
		const url = `/workiis/search`;
		const params = new HttpParams()
			.set('searchTerm', searchTerm)
			.set('limit', limit.toString())
			.set('offset', offset.toString());

		return this.http.get<{ workiis: IWorkii[]; totalSearchResults: number }>(url, { params });
	}

	removeApplication(id: string, workii: string): Observable<IApplicationResponse> {
		const url = `/workiis/apply/${id}`;

		const body = {
			workii
		};

		return this.http.delete<IApplicationResponse>(url, { body });
	}

	deleteWorkii(id: string): Observable<IApplicationResponse> {
		const url = `/workiis/${id}`;

		return this.http.delete<IApplicationResponse>(url);
	}
}
