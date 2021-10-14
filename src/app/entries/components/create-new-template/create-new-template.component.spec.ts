import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateNewTemplateComponent } from './create-new-template.component';

describe('CreateNewTemplateComponent', () => {
  let component: CreateNewTemplateComponent;
  let fixture: ComponentFixture<CreateNewTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
