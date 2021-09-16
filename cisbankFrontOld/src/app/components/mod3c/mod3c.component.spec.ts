import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod3cComponent } from './mod3c.component';

describe('Mod3cComponent', () => {
  let component: Mod3cComponent;
  let fixture: ComponentFixture<Mod3cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod3cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod3cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
