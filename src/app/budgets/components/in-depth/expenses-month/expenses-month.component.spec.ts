import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesMonthComponent } from './expenses-month.component';

describe('ExpensesMonthComponent', () => {
  let component: ExpensesMonthComponent;
  let fixture: ComponentFixture<ExpensesMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
