import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCanvasAccountManagementComponent } from './off-canvas-account-management.component';

describe('OffCanvasAccountManagementComponent', () => {
  let component: OffCanvasAccountManagementComponent;
  let fixture: ComponentFixture<OffCanvasAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffCanvasAccountManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffCanvasAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
