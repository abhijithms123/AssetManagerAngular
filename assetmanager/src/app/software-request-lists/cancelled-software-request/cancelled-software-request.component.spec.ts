import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledSoftwareRequestComponent } from './cancelled-software-request.component';

describe('CancelledSoftwareRequestComponent', () => {
  let component: CancelledSoftwareRequestComponent;
  let fixture: ComponentFixture<CancelledSoftwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledSoftwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelledSoftwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
