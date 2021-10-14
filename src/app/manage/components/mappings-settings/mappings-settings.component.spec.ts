import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MappingsSettingsComponent } from './mappings-settings.component';

describe('MappingsSettingsComponent', () => {
  let component: MappingsSettingsComponent;
  let fixture: ComponentFixture<MappingsSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
