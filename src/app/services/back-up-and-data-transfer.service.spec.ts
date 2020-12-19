import { TestBed } from '@angular/core/testing';

import { BackUpAndDataTransferService } from './back-up-and-data-transfer.service';

describe('BackUpAndDataTransferService', () => {
  let service: BackUpAndDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackUpAndDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
