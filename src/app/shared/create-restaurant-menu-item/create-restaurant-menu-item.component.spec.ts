import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantMenuItemComponent } from './create-restaurant-menu-item.component';

describe('CreateRestaurantMenuItemComponent', () => {
  let component: CreateRestaurantMenuItemComponent;
  let fixture: ComponentFixture<CreateRestaurantMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRestaurantMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRestaurantMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
