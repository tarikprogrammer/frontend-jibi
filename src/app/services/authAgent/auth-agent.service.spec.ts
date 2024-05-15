import { TestBed } from '@angular/core/testing';

import { AuthAgentService } from './auth-agent.service';

describe('AuthAgentService', () => {
  let service: AuthAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
