import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod5cComponent } from './mod5c.component';

describe('Mod5cComponent', () => {
  let component: Mod5cComponent;
  let fixture: ComponentFixture<Mod5cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod5cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod5cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
