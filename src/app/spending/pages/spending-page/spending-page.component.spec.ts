import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpendingPageComponent } from './spending-page.component';

describe('SpendingPageComponent', () => {
  let component: SpendingPageComponent;
  let fixture: ComponentFixture<SpendingPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
