import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContainer } from './chat.container';

describe('ChatContainer', () => {
  let component: ChatContainer;
  let fixture: ComponentFixture<ChatContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
