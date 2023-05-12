import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/modules/dashboard/workiis/service/paginationService.service';
import { ToggleLayoutService } from 'src/app/modules/dashboard/workiis/service/toggleLayoutService.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  public toggleLayoutService = inject(ToggleLayoutService);
  paginationService = inject(PaginationService);

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() totalResults!: number;
  @Input() limit!: number;

  toggleLayout$!: Observable<boolean>;
  totalPages: number = 0;
  pages: number[] = [];


  ngOnInit(): void {
    this.totalPages = this.totalResults && Math.ceil(this.totalResults / this.limit);

    this.pages = this.range(1, this.totalPages);

    this.pageChanged.emit(this.paginationService.currentPage$.value);

    this.toggleLayout$ = this.toggleLayoutService.toggleLayout$;
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map(el => el + start)
  }

  changePage(newPage: number) {
    this.paginationService.changePage(newPage);

    this.pageChanged.emit(newPage);
  }
}
