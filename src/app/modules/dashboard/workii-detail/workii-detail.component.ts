import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedWorkiiService } from '../workiis/service/shareWorkii.service';
import { IWorkii } from '../workiis/interfaces/workii.interface';
import { WorkiisService } from '../workiis/service/workiis.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'workii-detail',
  templateUrl: './workii-detail.component.html',
  styleUrls: ['./workii-detail.component.scss']
})
export class WorkiiDetailComponent {

  workii?: IWorkii;
  slug: string = this.route.snapshot.paramMap.get('slug')!;

  constructor(private route: ActivatedRoute,
    private workiisService: WorkiisService) {

     }

  ngOnInit(): void {
    console.log(`${this.slug} primer slug`);

    this.getWorkii(this.slug)
    .pipe()
    .subscribe( {
      next: body => {
        console.log(body);

      if(body)
      this.workii = body
      console.log(this.workii);

    },
    error: error => console.log(error)
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
}
