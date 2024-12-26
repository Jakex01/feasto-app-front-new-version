import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantStatisticsComponent } from './restaurant-statistics.component';

describe('RestaurantStatisticsComponent', () => {
  let component: RestaurantStatisticsComponent;
  let fixture: ComponentFixture<RestaurantStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
