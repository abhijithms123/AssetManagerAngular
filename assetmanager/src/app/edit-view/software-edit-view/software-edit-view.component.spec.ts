import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareEditViewComponent } from './software-edit-view.component';

describe('SoftwareEditViewComponent', () => {
  let component: SoftwareEditViewComponent;
  let fixture: ComponentFixture<SoftwareEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
