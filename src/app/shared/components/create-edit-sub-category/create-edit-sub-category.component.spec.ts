import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateEditSubCategoryComponent } from './create-edit-sub-category.component';

describe('CreateEditSubCategoryComponent', () => {
  let component: CreateEditSubCategoryComponent;
  let fixture: ComponentFixture<CreateEditSubCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
