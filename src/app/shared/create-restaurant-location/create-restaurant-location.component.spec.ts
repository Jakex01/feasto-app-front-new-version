import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantLocationComponent } from './create-restaurant-location.component';

describe('CreateRestaurantLocationComponent', () => {
  let component: CreateRestaurantLocationComponent;
  let fixture: ComponentFixture<CreateRestaurantLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRestaurantLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRestaurantLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
