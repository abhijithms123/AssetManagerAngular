import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSoftwareListComponent } from './user-software-list.component';

describe('UserSoftwareListComponent', () => {
  let component: UserSoftwareListComponent;
  let fixture: ComponentFixture<UserSoftwareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSoftwareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSoftwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
