import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod4Component } from './mod4.component';

describe('Mod4Component', () => {
  let component: Mod4Component;
  let fixture: ComponentFixture<Mod4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
