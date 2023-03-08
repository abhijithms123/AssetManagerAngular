import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledHardwareRequestComponent } from './cancelled-hardware-request.component';

describe('CancelledHardwareRequestComponent', () => {
  let component: CancelledHardwareRequestComponent;
  let fixture: ComponentFixture<CancelledHardwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledHardwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelledHardwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
