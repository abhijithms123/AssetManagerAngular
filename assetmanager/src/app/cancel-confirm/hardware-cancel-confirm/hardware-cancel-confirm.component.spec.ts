import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareCancelConfirmComponent } from './hardware-cancel-confirm.component';

describe('HardwareCancelConfirmComponent', () => {
  let component: HardwareCancelConfirmComponent;
  let fixture: ComponentFixture<HardwareCancelConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareCancelConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareCancelConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
