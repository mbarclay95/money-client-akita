import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnterEntriesTableComponent } from './enter-entries-table.component';

describe('EnterEntriesTableComponent', () => {
  let component: EnterEntriesTableComponent;
  let fixture: ComponentFixture<EnterEntriesTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterEntriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterEntriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
