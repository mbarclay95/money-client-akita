import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedStatsComponent } from './selected-stats.component';

describe('SelectedStatsComponent', () => {
  let component: SelectedStatsComponent;
  let fixture: ComponentFixture<SelectedStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
