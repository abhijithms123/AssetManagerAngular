import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareGraphComponent } from './hardware-graph.component';

describe('HardwareGraphComponent', () => {
  let component: HardwareGraphComponent;
  let fixture: ComponentFixture<HardwareGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
