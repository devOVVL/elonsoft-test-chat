import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsListContainer } from './chats-list.container';

describe('ChatsListContainer', () => {
  let component: ChatsListContainer;
  let fixture: ComponentFixture<ChatsListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
