import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScansTableComponent } from './scans-table.component';

describe('ScansTableComponent', () => {
  let component: ScansTableComponent;
  let fixture: ComponentFixture<ScansTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScansTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
