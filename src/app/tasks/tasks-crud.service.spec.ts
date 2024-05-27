import { TestBed } from '@angular/core/testing';

import { TasksCRUDService } from './tasks-crud.service';

describe('TasksCRUDService', () => {
  let service: TasksCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
