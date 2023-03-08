import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedSoftwareListComponent } from './approved-software-list.component';

describe('ApprovedSoftwareListComponent', () => {
  let component: ApprovedSoftwareListComponent;
  let fixture: ComponentFixture<ApprovedSoftwareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedSoftwareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedSoftwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
