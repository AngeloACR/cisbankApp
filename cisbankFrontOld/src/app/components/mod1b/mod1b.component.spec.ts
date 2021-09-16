import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod1bComponent } from './mod1b.component';

describe('Mod1bComponent', () => {
  let component: Mod1bComponent;
  let fixture: ComponentFixture<Mod1bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod1bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod1bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
