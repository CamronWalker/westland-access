import { TestBed } from '@angular/core/testing';

import { ProjectUserGuard } from './project-user.guard';

describe('ProjectUserGuard', () => {
  let guard: ProjectUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProjectUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
