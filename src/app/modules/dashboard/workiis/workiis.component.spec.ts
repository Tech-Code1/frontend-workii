import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkiisComponent } from './workiis.component';

describe('WorkiisComponent', () => {
  let component: WorkiisComponent;
  let fixture: ComponentFixture<WorkiisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkiisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkiisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
