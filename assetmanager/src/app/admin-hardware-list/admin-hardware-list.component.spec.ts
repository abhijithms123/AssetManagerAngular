import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHardwareListComponent } from './admin-hardware-list.component';

describe('AdminHardwareListComponent', () => {
  let component: AdminHardwareListComponent;
  let fixture: ComponentFixture<AdminHardwareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHardwareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHardwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
