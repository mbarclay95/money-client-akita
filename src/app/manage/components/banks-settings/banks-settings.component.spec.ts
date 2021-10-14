import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BanksSettingsComponent } from './banks-settings.component';

describe('BanksSettingsComponent', () => {
  let component: BanksSettingsComponent;
  let fixture: ComponentFixture<BanksSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BanksSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
