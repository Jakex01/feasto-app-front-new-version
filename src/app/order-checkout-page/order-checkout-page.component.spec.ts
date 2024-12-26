import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCheckoutPageComponent } from './order-checkout-page.component';

describe('OrderCheckoutPageComponent', () => {
  let component: OrderCheckoutPageComponent;
  let fixture: ComponentFixture<OrderCheckoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCheckoutPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderCheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
