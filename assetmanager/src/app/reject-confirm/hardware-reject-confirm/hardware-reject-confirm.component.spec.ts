import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareRejectConfirmComponent } from './hardware-reject-confirm.component';

describe('HardwareRejectConfirmComponent', () => {
  let component: HardwareRejectConfirmComponent;
  let fixture: ComponentFixture<HardwareRejectConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareRejectConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareRejectConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
