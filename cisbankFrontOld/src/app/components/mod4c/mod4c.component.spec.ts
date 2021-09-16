import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod4cComponent } from './mod4c.component';

describe('Mod4cComponent', () => {
  let component: Mod4cComponent;
  let fixture: ComponentFixture<Mod4cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod4cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod4cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
