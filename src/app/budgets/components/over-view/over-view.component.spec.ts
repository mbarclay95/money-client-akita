import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverViewComponent } from './over-view.component';

describe('OverViewComponent', () => {
  let component: OverViewComponent;
  let fixture: ComponentFixture<OverViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
