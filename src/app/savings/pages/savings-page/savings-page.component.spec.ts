import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsPageComponent } from './savings-page.component';

describe('SavingsPageComponent', () => {
  let component: SavingsPageComponent;
  let fixture: ComponentFixture<SavingsPageComponent>;

  beforeEach(async(() => {
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
