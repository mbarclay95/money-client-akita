import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategorySettingsComponent } from './category-settings.component';

describe('CategorySettingsComponent', () => {
  let component: CategorySettingsComponent;
  let fixture: ComponentFixture<CategorySettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
