import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncomeTableComponent } from './income-table.component';

describe('IncomeTableComponent', () => {
  let component: IncomeTableComponent;
  let fixture: ComponentFixture<IncomeTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
