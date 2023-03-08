import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareEditComponent } from './software-edit.component';

describe('SoftwareEditComponent', () => {
  let component: SoftwareEditComponent;
  let fixture: ComponentFixture<SoftwareEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
