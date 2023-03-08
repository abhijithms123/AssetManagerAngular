// import { HasRoleDirective } from './has-role.directive';

// describe('HasRoleDirective', () => {
//   it('should create an instance', () => {
//     const directive = new HasRoleDirective();
//     expect(directive).toBeTruthy();
//   });
// });
import { Component, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HasRoleDirective } from './has-role.directive';
import { LoginService } from './authentication/login.service';

@Component({
  template: `
    <div *appHasRole="'admin'">Admin content</div>
    <div *appHasRole="'user'">User content</div>
    <div *appHasRole="'guest'">Guest content</div>
  `
})
class TestComponent {
  @ViewChild(HasRoleDirective) directive: HasRoleDirective;
}

describe('HasRoleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let authServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    const authService = jasmine.createSpyObj('LoginService', ['getRole', 'hasRole']);

    TestBed.configureTestingModule({
      declarations: [HasRoleDirective, TestComponent],
      providers: [{ provide: LoginService, useValue: authService }]
    });

    fixture = TestBed.createComponent(TestComponent);
    authServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });

  it('should display content for matching role', () => {
    authServiceSpy.getRole.and.returnValue('admin');
    authServiceSpy.hasRole.and.returnValue(true);
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('div'));
    expect(elements[0].nativeElement.textContent).toBe('Admin content');
    expect(elements[1]).toBeFalsy();
    expect(elements[2]).toBeFalsy();
  });

  it('should hide content for non-matching role', () => {
    authServiceSpy.getRole.and.returnValue('user');
    authServiceSpy.hasRole.and.returnValue(false);
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('div'));
    expect(elements[0]).toBeFalsy();
    expect(elements[1].nativeElement.textContent).toBe('User content');
    expect(elements[2]).toBeFalsy();
  });
});

