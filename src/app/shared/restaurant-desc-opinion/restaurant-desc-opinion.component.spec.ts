import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDescOpinionComponent } from './restaurant-desc-opinion.component';

describe('RestaurantDescOpinionComponent', () => {
  let component: RestaurantDescOpinionComponent;
  let fixture: ComponentFixture<RestaurantDescOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantDescOpinionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantDescOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
