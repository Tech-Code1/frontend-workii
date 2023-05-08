import { ChangeDetectionStrategy, Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IApplicationUser } from '../../interfaces/workii.interface';

import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiInfo } from '../../workiis.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkiisCardsComponent {

  private modalService = inject(SwitchService)

  @Input() workiis!: (IWorkii & WorkiiInfo)[];
  @Input() searchWorkiis!: (IWorkii & WorkiiInfo)[];
  @Input() applications!: readonly IApplicationUser[];
  @Input() isFilterOpened!: boolean;
  @Input() userCurrentId!: string;
  @Input() searchControl!: FormControl<string>;
  @Input() totalResults!: number;
  @Input() totalSearchResults!: number;
  @Input() limit!: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageChangedWorkiis: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number = 0;
  totalPagesListWorkiis: number = 0;
  currentPage: number = 1;
  currentPageWorkiis: number = 1;
  pagesSearch: number[] = [];
  pagesWorkiis: number[] = [];

  applicationId!: string;
  modalSwitch: boolean = false;
  selectedWorkii!: IWorkii;
  index!: number;

  ngOnInit(): void {
    this.totalPages = this.totalSearchResults && Math.ceil(this.totalSearchResults / this.limit)

    this.totalPagesListWorkiis = this.totalResults && Math.ceil(this.totalResults / this.limit)


    this.pagesSearch = this.range(1, this.totalPages);
    this.pagesWorkiis = this.range(1, this.totalPagesListWorkiis);

    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })
  }

  openModal(workii: IWorkii, index: number, applies: readonly IApplicationUser[]): void {
    this.modalSwitch = true
    this.selectedWorkii = workii;
    this.index = index;

    applies.map(apply => {
      workii.id.includes(apply.workii.id)
        ? this.applicationId = apply.id!
        : ''
    })
  }

  shouldDisplayContent(): boolean | undefined {
    return this.searchWorkiis && this.searchControl.value !== '';
  }

  notDisplayContent(): boolean | undefined {
    return this.searchControl.value === null || this.searchControl.value === '';
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map(el => el + start)
  }

  changePageSearch(newPage: number) {
    this.currentPage = newPage;
    this.pageChanged.emit(newPage);
  }

  changePageWorkiis(newPage: number) {
    console.log(newPage, 'page');

    this.currentPageWorkiis = newPage;
    console.log(this.currentPageWorkiis, 'page');

    this.pageChangedWorkiis.emit(newPage);
  }

  ngDestroy() {
    this.modalService.$modal.unsubscribe();
  }
}


