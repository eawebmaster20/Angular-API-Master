import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function headerModifierInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(req.url);
    return next(req.clone({
      headers: req.headers.append('X-Authentication-Token', 'mock authentication token'),
    }));
  }