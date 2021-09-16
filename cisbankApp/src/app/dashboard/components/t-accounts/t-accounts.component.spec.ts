import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TAccountsComponent } from './t-accounts.component';

describe('TAccountsComponent', () => {
  let component: TAccountsComponent;
  let fixture: ComponentFixture<TAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
