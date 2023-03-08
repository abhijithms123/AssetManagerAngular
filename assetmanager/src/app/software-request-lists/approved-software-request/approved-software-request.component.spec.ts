import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedSoftwareRequestComponent } from './approved-software-request.component';

describe('ApprovedSoftwareRequestComponent', () => {
  let component: ApprovedSoftwareRequestComponent;
  let fixture: ComponentFixture<ApprovedSoftwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedSoftwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedSoftwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
