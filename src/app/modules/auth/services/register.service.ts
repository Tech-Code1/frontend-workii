import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { IAuthResponse, IOtp, IUser } from '../interfaces/auth.interface';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { loginDTO } from '../DTOs/loginDTO';
import { registerDTO } from '../DTOs/registerDTO';
import { AuthService } from './auth.service';
import { buildFormData } from 'src/app/shared/utils/buildFormData';
import { ICreateUser } from '../interfaces/createUser.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl: string = environment.baseUrl;
  loginEmail!: string | undefined;
  public userCreationDTO: ICreateUser = {};
  public previewImages :any = {};
  public AddInfoUser(data: any) {
    this.userCreationDTO = {
      ...this.userCreationDTO,
      ...data,
    };
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService ) { }

  public finishUserCreation() {

    const url = `${this.baseUrl}/users/register`;

    const finalDTO = {
      avatar: this.userCreationDTO.avatar,
      nick: this.userCreationDTO.nick,
      password: this.userCreationDTO.password,
    };

    let formData = buildFormData(finalDTO);

    formData.append('areaOfExpertise', JSON.stringify([this.userCreationDTO.areaOfExpertise]));
    formData.append('profession', JSON.stringify([this.userCreationDTO.profession]));

    console.log(formData.get('areaOfExpertise'));
    console.log(formData.get('profession'));
    console.log(typeof formData.get('areaOfExpertise') );
    console.log(typeof formData.get('profession') );


    console.log(formData);

    return this.http.post(url, formData).pipe(
      tap(()=>{
        this.userCreationDTO = {};
      })
    );
  }

  /* register({avatar, nick, password} : registerDTO) {


    const url = `${this.baseUrl}/auth/login`;
    const body = { avatar, nick };

    if(this.authService.loginPassword === password) {
      return this.http.post<IAuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok ) {

          }
        }),
        map(resp => {
          this.loginEmail = resp.email
        }
        ),
        catchError(err => of(err.error.message))
      )
    }
  } */
}
