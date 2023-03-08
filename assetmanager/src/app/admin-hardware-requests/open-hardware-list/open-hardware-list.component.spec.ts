import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenHardwareListComponent } from './open-hardware-list.component';

describe('OpenHardwareListComponent', () => {
  let component: OpenHardwareListComponent;
  let fixture: ComponentFixture<OpenHardwareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenHardwareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenHardwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
