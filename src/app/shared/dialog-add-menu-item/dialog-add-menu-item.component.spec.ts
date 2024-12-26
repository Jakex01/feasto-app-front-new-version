import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMenuItemComponent } from './dialog-add-menu-item.component';

describe('DialogAddMenuItemComponent', () => {
  let component: DialogAddMenuItemComponent;
  let fixture: ComponentFixture<DialogAddMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
