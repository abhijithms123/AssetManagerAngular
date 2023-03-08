import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasedSoftwareRequestComponent } from './released-software-request.component';

describe('ReleasedSoftwareRequestComponent', () => {
  let component: ReleasedSoftwareRequestComponent;
  let fixture: ComponentFixture<ReleasedSoftwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleasedSoftwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleasedSoftwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
