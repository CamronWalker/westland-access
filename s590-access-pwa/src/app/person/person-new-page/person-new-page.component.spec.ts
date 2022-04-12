import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonNewPageComponent } from './person-new-page.component';

describe('PersonNewPageComponent', () => {
  let component: PersonNewPageComponent;
  let fixture: ComponentFixture<PersonNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonNewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
