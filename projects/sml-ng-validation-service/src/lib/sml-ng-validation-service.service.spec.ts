import { TestBed } from '@angular/core/testing';

import { SmlNgValidationService } from './sml-ng-validation-service.service';

describe('SmlNgValidationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmlNgValidationService = TestBed.get(SmlNgValidationService);
    expect(service).toBeTruthy();
  });
});
