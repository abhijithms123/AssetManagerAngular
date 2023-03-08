import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareConfirmComponent } from './hardware-confirm.component';

describe('HardwareConfirmComponent', () => {
  let component: HardwareConfirmComponent;
  let fixture: ComponentFixture<HardwareConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
