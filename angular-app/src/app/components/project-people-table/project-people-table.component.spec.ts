import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPeopleTableComponent } from './project-people-table.component';

describe('ProjectPeopleTableComponent', () => {
  let component: ProjectPeopleTableComponent;
  let fixture: ComponentFixture<ProjectPeopleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPeopleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPeopleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
