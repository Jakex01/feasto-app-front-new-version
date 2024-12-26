import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageExchangeComponent } from './message-exchange.component';

describe('MessageExchangeComponent', () => {
  let component: MessageExchangeComponent;
  let fixture: ComponentFixture<MessageExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageExchangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
