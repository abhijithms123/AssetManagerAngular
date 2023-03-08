// import { TestBed } from '@angular/core/testing';

// import { LoginService } from './login.service';

// describe('LoginService', () => {
//   let service: LoginService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(LoginService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    sessionStorage.setItem('authenticated', 'true');
    expect(service.isAuthenticated()).toEqual('true');
  });

  it('should return null if user is not authenticated', () => {
    expect(service.isAuthenticated()).toBeNull();
  });

  it('should return the user token from the session storage', () => {
    const token = 'abc123';
    sessionStorage.setItem('token', token);
    expect(service.getToken()).toEqual(token);
  });

  it('should send a POST request to authenticate the user', () => {
    const user = { username: 'testuser', password: 'testpassword' };
    const token = 'abc123';
    const role = 'USER';
    const response = { token: token, role: role };

    service.loginUser(user).subscribe((res: any) => {
      expect(res.token).toEqual(token);
      expect(res.role).toEqual(role);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/auth/authenticate');
    expect(req.request.method).toEqual('POST');
    req.flush(response);
  });

  it('should set the user role in session storage', () => {
    const role = 'ADMIN';
    service['userRole'] = role;
    service.getRole();
    expect(sessionStorage.getItem('role')).toEqual(role);
  });

  it('should return true if user has the specified role', () => {
    const role = 'USER';
    sessionStorage.setItem('role', role);
    expect(service.hasRole(role)).toBeTrue();
  });

  it('should return false if user does not have the specified role', () => {
    const role = 'ADMIN';
    sessionStorage.setItem('role', 'USER');
    expect(service.hasRole(role)).toBeFalse();
  });

  it('should log the user out and clear the session storage', () => {
    service.logout().subscribe();
    const req = httpMock.expectOne('http://localhost:8080/api/v1/auth/app/logout');
    expect(req.request.method).toEqual('POST');
    req.flush({});
    expect(sessionStorage.getItem('authenticated')).toBeNull();
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('role')).toBeNull();
  });
  
  it('should set a timer to log the user out', () => {
    const expirationDate = 10000;
    service.autoLogout(expirationDate);
    expect(service['clearTokenTimer']).not.toBeNull();
  });
});
