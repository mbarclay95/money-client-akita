import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphForYearComponent } from './graph-for-year.component';

describe('GraphForYearComponent', () => {
  let component: GraphForYearComponent;
  let fixture: ComponentFixture<GraphForYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphForYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphForYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
