import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEntriesTableComponent } from './view-entries-table.component';

describe('ViewEntriesTableComponent', () => {
  let component: ViewEntriesTableComponent;
  let fixture: ComponentFixture<ViewEntriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEntriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEntriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
