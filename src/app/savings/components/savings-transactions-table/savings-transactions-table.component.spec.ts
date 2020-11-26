import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsTransactionsTableComponent } from './savings-transactions-table.component';

describe('SavingsTransactionsTableComponent', () => {
  let component: SavingsTransactionsTableComponent;
  let fixture: ComponentFixture<SavingsTransactionsTableComponent>;

  beforeEach(async(() => {
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
