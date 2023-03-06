import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedWorkiiService } from '../workiis/service/shareWorkii.service';
import { IApplicationUser, IWorkii } from '../workiis/interfaces/workii.interface';
import { WorkiisService } from '../workiis/service/workiis.service';
import { Observable, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'workii-detail',
  templateUrl: './workii-detail.component.html',
  styleUrls: ['./workii-detail.component.scss']
})
export class WorkiiDetailComponent {

  workii?: IWorkii;
  slug: string = this.route.snapshot.paramMap.get('slug')!;
  userCurrentId!: string;
  isOwner!: boolean;
  isApplyWorkiiId!: string[];
  applies!: IApplicationUser[];

  constructor(private route: ActivatedRoute,
    private workiisService: WorkiisService,
    private userService: UserService) {

     }

  ngOnInit(): void {

    this.userCurrentId = this.userService.getCurrentUser()
    console.log(`${this.slug} primer slug`);

    console.log(this.userCurrentId);



    this.getWorkii(this.slug)
    .pipe(
      map(workii => {

        const isOwner: boolean = workii.user.id.includes(this.userCurrentId);

        return { workii,  isOwner}
      }
      )
    )
    .subscribe(({workii, isOwner}) => {
      this.isOwner = isOwner;
      this.workii = workii;

      console.log(this.isOwner);
      console.log(this.workii.id);

    });


    this.findAllApplicationsWorkiiByUser(this.userCurrentId)
    .pipe(
      map(applies => {
        //const applyId = applies.map(apply => apply.id);
        const userApplies = applies.map(apply => apply.workii.id)

        return {userApplies, applies}
      })
    ).subscribe(({userApplies, applies}) => {

      this.isApplyWorkiiId = userApplies
      this.applies = applies

      console.log(this.isApplyWorkiiId);
      console.log(applies);
    })
  }

  getWorkii(slug: string): Observable<IWorkii> {

    // Obtener el token de autorización
    const token = localStorage.getItem('token');

    // Crear el encabezado de la solicitud HTTP
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.workiisService.getWorkii( slug, headers)

  }


  findAllApplicationsWorkiiByUser(id: string): Observable<IApplicationUser[]> {

    return this.workiisService.findAllApplicationsWorkiiByUser(id)
  }
}
