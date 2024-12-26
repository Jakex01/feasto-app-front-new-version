import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFinalVersionComponent } from './register-final-version.component';

describe('RegisterFinalVersionComponent', () => {
  let component: RegisterFinalVersionComponent;
  let fixture: ComponentFixture<RegisterFinalVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFinalVersionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterFinalVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
