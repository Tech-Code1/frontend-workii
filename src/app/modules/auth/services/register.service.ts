import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { buildFormData } from 'src/app/shared/utils/buildFormData';
import { ICreateUser, ICreateUserResponse } from '../interfaces/createUser.interface';

@Injectable({
	providedIn: 'root'
})
export class RegisterService {
	private http = inject(HttpClient);
	loginEmail!: string | undefined;
	public userCreationDTO: ICreateUser = {};
	public previewImages: any = {};
	public AddInfoUser(data: any): void {
		this.userCreationDTO = {
			...this.userCreationDTO,
			...data
		};
	}

	public finishUserCreation(): Observable<ICreateUserResponse> {
		const url = `/users/register`;

		const finalDTO = {
			avatar: this.userCreationDTO.avatar,
			nick: this.userCreationDTO.nick,
			password: this.userCreationDTO.password,
			profession: this.userCreationDTO.profession,
			areaOfExpertise: this.userCreationDTO.areaOfExpertise
		};

		let formData = buildFormData(finalDTO);

		return this.http.post<ICreateUserResponse>(url, formData).pipe(
			tap(() => {
				this.userCreationDTO = {};
			})
		);
	}
}
