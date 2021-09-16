import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mod2bComponent } from './mod2b.component';

describe('Mod2bComponent', () => {
  let component: Mod2bComponent;
  let fixture: ComponentFixture<Mod2bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mod2bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mod2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
