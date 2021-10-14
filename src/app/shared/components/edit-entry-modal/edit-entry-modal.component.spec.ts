import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditEntryModalComponent } from './edit-entry-modal.component';

describe('EditEntryModalComponent', () => {
  let component: EditEntryModalComponent;
  let fixture: ComponentFixture<EditEntryModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
