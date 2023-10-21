import { TestBed } from '@angular/core/testing';

import { TerraService } from './terra.service';

describe('TerraService', () => {
  let service: TerraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
