import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";
import { ErrorHandlerService } from "../errorHandler/error-handler.service";

export function headerModifierInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const errorHandlerService = inject(ErrorHandlerService)
    console.log(req.url);
    return next(req.clone({
      headers: req.headers.append('X-Authentication-Token', 'mock authentication token'),
    })).pipe(
      retry(2),
      catchError(err => {
        errorHandlerService.handleError(err.message);
        return throwError(() => new Error('All retries failed:'))
      })
    );
  }