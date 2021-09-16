import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod5bComponent } from './mod5b.component';

describe('Mod5bComponent', () => {
  let component: Mod5bComponent;
  let fixture: ComponentFixture<Mod5bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod5bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod5bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
