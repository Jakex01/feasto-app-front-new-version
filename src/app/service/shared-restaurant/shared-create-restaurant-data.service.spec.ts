import { TestBed } from '@angular/core/testing';

import { SharedCreateRestaurantDataService } from './shared-create-restaurant-data.service';

describe('SharedCreateRestaurantDataService', () => {
  let service: SharedCreateRestaurantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCreateRestaurantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
