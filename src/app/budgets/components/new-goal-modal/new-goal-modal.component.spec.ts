import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewGoalModalComponent } from './new-goal-modal.component';

describe('NewGoalModalComponent', () => {
  let component: NewGoalModalComponent;
  let fixture: ComponentFixture<NewGoalModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGoalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
