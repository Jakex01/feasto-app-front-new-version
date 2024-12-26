import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantCardComponent } from './create-restaurant-card.component';

describe('CreateRestaurantCardComponent', () => {
  let component: CreateRestaurantCardComponent;
  let fixture: ComponentFixture<CreateRestaurantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRestaurantCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRestaurantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
