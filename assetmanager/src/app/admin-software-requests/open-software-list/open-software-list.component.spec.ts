import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSoftwareListComponent } from './open-software-list.component';

describe('OpenSoftwareListComponent', () => {
  let component: OpenSoftwareListComponent;
  let fixture: ComponentFixture<OpenSoftwareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenSoftwareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenSoftwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
