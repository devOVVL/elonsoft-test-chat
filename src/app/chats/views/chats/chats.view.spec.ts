import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsView } from './chats.view';

describe('ChatsView', () => {
  let component: ChatsView;
  let fixture: ComponentFixture<ChatsView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
