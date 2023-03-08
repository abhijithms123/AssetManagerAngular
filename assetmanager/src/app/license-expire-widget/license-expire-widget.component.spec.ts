import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseExpireWidgetComponent } from './license-expire-widget.component';

describe('LicenseExpireWidgetComponent', () => {
  let component: LicenseExpireWidgetComponent;
  let fixture: ComponentFixture<LicenseExpireWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseExpireWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseExpireWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
