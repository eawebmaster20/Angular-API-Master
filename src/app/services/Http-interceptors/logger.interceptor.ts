import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, retry, retryWhen, tap, throwError } from "rxjs";

export function loggerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(
      tap(()=>
        console.log('you made a ',req.method,' request to :',req.url)),
      tap(event => {
        console.log(event)
        if (event.type === HttpEventType.Response) {
        console.log('returned a response with status', event.status);
      }
    }),
    retry(2),
    catchError(err => {
       return throwError(() => new Error('All retries failed:', err))
    })
  
  );
  }