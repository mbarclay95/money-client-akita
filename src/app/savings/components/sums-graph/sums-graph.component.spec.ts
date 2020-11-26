import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumsGraphComponent } from './sums-graph.component';

describe('SumsGraphComponent', () => {
  let component: SumsGraphComponent;
  let fixture: ComponentFixture<SumsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
