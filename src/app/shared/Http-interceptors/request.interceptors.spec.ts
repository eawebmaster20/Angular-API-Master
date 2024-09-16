import { TestBed } from '@angular/core/testing';
import { HttpHandlerFn, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { headerModifierInterceptor } from './header-modifier.interceptor'; // Update the path as needed
import { ErrorHandlerService } from '../errorHandler/error-handler.service';

describe('headerModifierInterceptor', () => {
  let errorHandlerService: jasmine.SpyObj<ErrorHandlerService>;

  beforeEach(() => {
    const errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
      ],
    });

    errorHandlerService = TestBed.inject(ErrorHandlerService) as jasmine.SpyObj<ErrorHandlerService>;
  });

  it('should add the X-Authentication-Token header to the request', () => {
    const mockRequest = new HttpRequest('GET', '/api/posts');
    const next: HttpHandlerFn = jasmine.createSpy('next').and.returnValue(of(new HttpResponse({ status: 200 })));

    headerModifierInterceptor(mockRequest, next).subscribe((event) => {
      if (event instanceof HttpResponse) {
        expect(next).toHaveBeenCalled();
        expect(mockRequest.headers.has('X-Authentication-Token')).toBeTrue();
        expect(mockRequest.headers.get('X-Authentication-Token')).toBe('mock authentication token');
      }
    });
  });

  it('should handle errors and call ErrorHandlerService on failure', () => {
    const mockRequest = new HttpRequest('GET', '/api/posts');
    const next: HttpHandlerFn = jasmine.createSpy('next').and.returnValue(throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Server Error' })));

    headerModifierInterceptor(mockRequest, next).subscribe({
      next: () => fail('expected an error'),
      error: (err) => {
        expect(errorHandlerService.handleError).toHaveBeenCalledWith('Server Error');
        expect(err.message).toBe('All retries failed:');
      },
    });
  });
});
