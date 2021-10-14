import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectedDetailsComponent } from './selected-details.component';

describe('SelectedDetailsComponent', () => {
  let component: SelectedDetailsComponent;
  let fixture: ComponentFixture<SelectedDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
