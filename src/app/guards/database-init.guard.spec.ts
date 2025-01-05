import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { databaseInitGuard } from './database-init.guard';

describe('databaseInitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => databaseInitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
