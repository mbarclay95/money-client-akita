import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnterEntriesPageComponent } from './enter-entries-page.component';

describe('EnterEntriesPageComponent', () => {
  let component: EnterEntriesPageComponent;
  let fixture: ComponentFixture<EnterEntriesPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterEntriesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterEntriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
