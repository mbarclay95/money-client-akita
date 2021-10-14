import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InDepthViewComponent } from './in-depth-view.component';

describe('InDepthViewComponent', () => {
  let component: InDepthViewComponent;
  let fixture: ComponentFixture<InDepthViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InDepthViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InDepthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
