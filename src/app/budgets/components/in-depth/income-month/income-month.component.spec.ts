import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncomeMonthComponent } from './income-month.component';

describe('IncomeMonthComponent', () => {
  let component: IncomeMonthComponent;
  let fixture: ComponentFixture<IncomeMonthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
