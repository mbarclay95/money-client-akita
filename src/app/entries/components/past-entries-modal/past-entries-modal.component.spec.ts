import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PastEntriesModalComponent } from './past-entries-modal.component';

describe('PastEntriesModalComponent', () => {
  let component: PastEntriesModalComponent;
  let fixture: ComponentFixture<PastEntriesModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PastEntriesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastEntriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
