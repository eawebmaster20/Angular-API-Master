import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";

export function headerModifierInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(req.url);
    return next(req.clone({
      headers: req.headers.append('X-Authentication-Token', 'mock authentication token'),
    })).pipe(
      retry(2),
      catchError(err => {
        return throwError(() => new Error('All retries failed:', err))
      })
    );
  }