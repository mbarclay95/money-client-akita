import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntrySettingsComponent } from './entry-settings.component';

describe('EntrySettingsComponent', () => {
  let component: EntrySettingsComponent;
  let fixture: ComponentFixture<EntrySettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
