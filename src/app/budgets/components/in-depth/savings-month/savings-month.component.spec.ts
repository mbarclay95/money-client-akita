import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SavingsMonthComponent } from './savings-month.component';

describe('SavingsMonthComponent', () => {
  let component: SavingsMonthComponent;
  let fixture: ComponentFixture<SavingsMonthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
