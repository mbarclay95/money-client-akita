import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LastYearGraphComponent } from './last-year-graph.component';

describe('LastYearGraphComponent', () => {
  let component: LastYearGraphComponent;
  let fixture: ComponentFixture<LastYearGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LastYearGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastYearGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
