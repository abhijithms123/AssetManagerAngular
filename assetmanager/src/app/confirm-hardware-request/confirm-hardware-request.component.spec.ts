import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmHardwareRequestComponent } from './confirm-hardware-request.component';

describe('ConfirmHardwareRequestComponent', () => {
  let component: ConfirmHardwareRequestComponent;
  let fixture: ComponentFixture<ConfirmHardwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmHardwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmHardwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
