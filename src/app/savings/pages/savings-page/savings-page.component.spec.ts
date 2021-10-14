import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SavingsPageComponent } from './savings-page.component';

describe('SavingsPageComponent', () => {
  let component: SavingsPageComponent;
  let fixture: ComponentFixture<SavingsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
