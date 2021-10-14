import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsForYearComponent } from './stats-for-year.component';

describe('StatsForYearComponent', () => {
  let component: StatsForYearComponent;
  let fixture: ComponentFixture<StatsForYearComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsForYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsForYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
