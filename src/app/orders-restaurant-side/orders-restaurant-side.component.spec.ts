import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersRestaurantSideComponent } from './orders-restaurant-side.component';

describe('OrdersRestaurantSideComponent', () => {
  let component: OrdersRestaurantSideComponent;
  let fixture: ComponentFixture<OrdersRestaurantSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersRestaurantSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersRestaurantSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
