import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastYearGraphComponent } from './last-year-graph.component';

describe('LastYearGraphComponent', () => {
  let component: LastYearGraphComponent;
  let fixture: ComponentFixture<LastYearGraphComponent>;

  beforeEach(async(() => {
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
