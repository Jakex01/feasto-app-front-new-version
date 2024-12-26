import { TestBed } from '@angular/core/testing';

import { SubmitRestaurantService } from './submit-restaurant.service';

describe('SubmitRestaurantService', () => {
  let service: SubmitRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
