import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod4bComponent } from './mod4b.component';

describe('Mod4bComponent', () => {
  let component: Mod4bComponent;
  let fixture: ComponentFixture<Mod4bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod4bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod4bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
