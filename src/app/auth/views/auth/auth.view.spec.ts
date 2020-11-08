import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthView } from './auth.view';

describe('AuthView', () => {
  let component: AuthView;
  let fixture: ComponentFixture<AuthView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
