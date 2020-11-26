import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsMonthComponent } from './savings-month.component';

describe('SavingsMonthComponent', () => {
  let component: SavingsMonthComponent;
  let fixture: ComponentFixture<SavingsMonthComponent>;

  beforeEach(async(() => {
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
