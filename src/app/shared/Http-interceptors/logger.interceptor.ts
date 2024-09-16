import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, retry, retryWhen, tap, throwError } from "rxjs";
import { CacheService } from "../services/indexDb/index-db.service";

export function loggerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // const cacheService = inject(CacheService);
  
  return next(req).pipe(
      tap(()=>
        console.log('you made a ',req.method,' request to :',req.url)),
      tap(event => {
        console.log(event)
        if (event.type === HttpEventType.Response) {
        console.log('returned a response with status', event.status);
        console.log(event.body)
        // cacheService.setCache(req.url, event.body);
      }
    }),
    retry(2),
    catchError(err => {
       return throwError(() => new Error('All retries failed:', err))
    })
  
  );
  }