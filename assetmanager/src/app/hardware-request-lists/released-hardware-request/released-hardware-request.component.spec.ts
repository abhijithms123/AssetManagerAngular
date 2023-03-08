import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasedHardwareRequestComponent } from './released-hardware-request.component';

describe('ReleasedHardwareRequestComponent', () => {
  let component: ReleasedHardwareRequestComponent;
  let fixture: ComponentFixture<ReleasedHardwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleasedHardwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleasedHardwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
