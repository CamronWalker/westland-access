import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleTablePageComponent } from './people-table-page.component';

describe('PeopleTablePageComponent', () => {
  let component: PeopleTablePageComponent;
  let fixture: ComponentFixture<PeopleTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleTablePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
