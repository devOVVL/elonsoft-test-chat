import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContainer } from './register.container';

describe('RegisterContainer', () => {
  let component: RegisterContainer;
  let fixture: ComponentFixture<RegisterContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
