import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantItemsListAdminComponent } from './restaurant-items-list-admin.component';

describe('RestaurantItemsListAdminComponent', () => {
  let component: RestaurantItemsListAdminComponent;
  let fixture: ComponentFixture<RestaurantItemsListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantItemsListAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantItemsListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
