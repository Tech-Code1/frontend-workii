import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { PaginationService } from 'src/app/modules/dashboard/workiis/service/paginationService.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  paginationService = inject(PaginationService);

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() totalResults!: number;
  @Input() limit!: number;

  totalPages: number = 0;
  pages: number[] = [];


  ngOnInit(): void {
    this.totalPages = this.totalResults && Math.ceil(this.totalResults / this.limit);

    this.pages = this.range(1, this.totalPages);

    this.pageChanged.emit(this.paginationService.currentPage$.value);
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map(el => el + start)
  }

  changePage(newPage: number) {
    this.paginationService.changePage(newPage);

    this.pageChanged.emit(newPage);
  }
}
