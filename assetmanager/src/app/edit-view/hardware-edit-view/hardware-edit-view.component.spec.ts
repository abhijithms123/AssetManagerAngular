import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareEditViewComponent } from './hardware-edit-view.component';

describe('HardwareEditViewComponent', () => {
  let component: HardwareEditViewComponent;
  let fixture: ComponentFixture<HardwareEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
