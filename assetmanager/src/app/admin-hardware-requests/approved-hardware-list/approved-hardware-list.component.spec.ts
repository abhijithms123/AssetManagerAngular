import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedHardwareListComponent } from './approved-hardware-list.component';

describe('ApprovedHardwareListComponent', () => {
  let component: ApprovedHardwareListComponent;
  let fixture: ComponentFixture<ApprovedHardwareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedHardwareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedHardwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
