import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRestaurantDataComponent } from './update-restaurant-data.component';

describe('UpdateRestaurantDataComponent', () => {
  let component: UpdateRestaurantDataComponent;
  let fixture: ComponentFixture<UpdateRestaurantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRestaurantDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRestaurantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
