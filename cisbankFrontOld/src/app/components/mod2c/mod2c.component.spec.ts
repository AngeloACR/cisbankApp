import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod2cComponent } from './mod2c.component';

describe('Mod2cComponent', () => {
  let component: Mod2cComponent;
  let fixture: ComponentFixture<Mod2cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod2cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
