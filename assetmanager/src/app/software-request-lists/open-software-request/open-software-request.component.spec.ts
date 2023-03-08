import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSoftwareRequestComponent } from './open-software-request.component';

describe('OpenSoftwareRequestComponent', () => {
  let component: OpenSoftwareRequestComponent;
  let fixture: ComponentFixture<OpenSoftwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenSoftwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenSoftwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
