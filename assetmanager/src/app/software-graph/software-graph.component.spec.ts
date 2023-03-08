import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareGraphComponent } from './software-graph.component';

describe('SoftwareGraphComponent', () => {
  let component: SoftwareGraphComponent;
  let fixture: ComponentFixture<SoftwareGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
