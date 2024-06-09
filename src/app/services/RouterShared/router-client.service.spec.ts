import { TestBed } from '@angular/core/testing';

import { RouterClientService } from './router-client.service';

describe('RouterClientService', () => {
  let service: RouterClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
