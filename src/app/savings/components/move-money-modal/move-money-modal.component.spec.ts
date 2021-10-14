import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoveMoneyModalComponent } from './move-money-modal.component';

describe('MoveMoneyModalComponent', () => {
  let component: MoveMoneyModalComponent;
  let fixture: ComponentFixture<MoveMoneyModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveMoneyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveMoneyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
