import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateEditBankComponent } from './create-edit-bank.component';

describe('CreateEditBankComponent', () => {
  let component: CreateEditBankComponent;
  let fixture: ComponentFixture<CreateEditBankComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
