import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareFilteredListComponent } from './hardware-filtered-list.component';

describe('HardwareFilteredListComponent', () => {
  let component: HardwareFilteredListComponent;
  let fixture: ComponentFixture<HardwareFilteredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareFilteredListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareFilteredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
