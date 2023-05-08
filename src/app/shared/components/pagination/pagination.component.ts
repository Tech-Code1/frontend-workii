import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() totalResults!: number;
  @Input() limit!: number;

  totalPages: number = 0;
  currentPage: number = 1;
  pages: number[] = [];


  ngOnInit(): void {
    this.totalPages = this.totalResults && Math.ceil(this.totalResults / this.limit);

    this.pages = this.range(1, this.totalPages);
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map(el => el + start)
  }

  changePage(newPage: number) {
    console.log(newPage, 'page');

    this.currentPage = newPage;
    console.log(this.currentPage, 'page');

    this.pageChanged.emit(newPage);
  }
}
