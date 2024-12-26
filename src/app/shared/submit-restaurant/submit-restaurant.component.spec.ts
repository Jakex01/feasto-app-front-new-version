import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRestaurantComponent } from './submit-restaurant.component';

describe('SubmitRestaurantComponent', () => {
  let component: SubmitRestaurantComponent;
  let fixture: ComponentFixture<SubmitRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
