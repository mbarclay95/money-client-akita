import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SavingsTransactionsTableComponent } from './savings-transactions-table.component';

describe('SavingsTransactionsTableComponent', () => {
  let component: SavingsTransactionsTableComponent;
  let fixture: ComponentFixture<SavingsTransactionsTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsTransactionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsTransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
