import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPersonComponent } from './project-person.component';

describe('ProjectPersonComponent', () => {
  let component: ProjectPersonComponent;
  let fixture: ComponentFixture<ProjectPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
