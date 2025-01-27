/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedFilesService } from './shareFiles.service';

describe('Service: ShredFiles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedFilesService]
    });
  });

  it('should ...', inject([SharedFilesService], (service: SharedFilesService) => {
    expect(service).toBeTruthy();
  }));
});
