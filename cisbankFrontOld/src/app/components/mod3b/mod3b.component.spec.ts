import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod3bComponent } from './mod3b.component';

describe('Mod3bComponent', () => {
  let component: Mod3bComponent;
  let fixture: ComponentFixture<Mod3bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod3bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod3bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
