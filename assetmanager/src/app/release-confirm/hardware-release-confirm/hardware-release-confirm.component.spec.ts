import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareReleaseConfirmComponent } from './hardware-release-confirm.component';

describe('HardwareReleaseConfirmComponent', () => {
  let component: HardwareReleaseConfirmComponent;
  let fixture: ComponentFixture<HardwareReleaseConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareReleaseConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareReleaseConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
