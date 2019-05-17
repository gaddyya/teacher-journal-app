import { TestBed } from '@angular/core/testing';

import { StatisticsDatabaseService } from './statistics-database.service';

describe('StatisticsDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisticsDatabaseService = TestBed.get(StatisticsDatabaseService);
    expect(service).toBeTruthy();
  });
});
