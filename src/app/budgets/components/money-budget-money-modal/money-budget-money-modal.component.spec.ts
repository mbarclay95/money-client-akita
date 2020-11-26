import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyBudgetMoneyModalComponent } from './money-budget-money-modal.component';

describe('MoneyBudgetMoneyModalComponent', () => {
  let component: MoneyBudgetMoneyModalComponent;
  let fixture: ComponentFixture<MoneyBudgetMoneyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyBudgetMoneyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyBudgetMoneyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
