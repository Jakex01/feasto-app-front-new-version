import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCanvasCartComponent } from './off-canvas-cart.component';

describe('OffCanvasCartComponent', () => {
  let component: OffCanvasCartComponent;
  let fixture: ComponentFixture<OffCanvasCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffCanvasCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffCanvasCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
