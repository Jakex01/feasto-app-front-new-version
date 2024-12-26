import { TestBed } from '@angular/core/testing';

import { CurrentMenuItemService } from './current-menu-item.service';

describe('CurrentMenuItemService', () => {
  let service: CurrentMenuItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentMenuItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
