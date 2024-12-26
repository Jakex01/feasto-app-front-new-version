import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateOrderModalComponent } from './rate-order-modal.component';

describe('RateOrderModalComponent', () => {
  let component: RateOrderModalComponent;
  let fixture: ComponentFixture<RateOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateOrderModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
