import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export function loggerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(tap(event => {
        console.log(event)
        console.log('you made a ',req.method,' request to :',req.url);
        if (event.type === HttpEventType.Response) {
        console.log('returned a response with status', event.status);
      }
    }));
  }