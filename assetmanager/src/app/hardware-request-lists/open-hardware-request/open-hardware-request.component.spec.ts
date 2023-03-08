import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenHardwareRequestComponent } from './open-hardware-request.component';

describe('OpenHardwareRequestComponent', () => {
  let component: OpenHardwareRequestComponent;
  let fixture: ComponentFixture<OpenHardwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenHardwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenHardwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
