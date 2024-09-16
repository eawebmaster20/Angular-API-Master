import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, retry, tap, throwError } from "rxjs";
import { ErrorHandlerService } from "../errorHandler/error-handler.service";
import { CacheService } from "../services/indexDb/index-db.service";

export function headerModifierInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const errorHandlerService = inject(ErrorHandlerService)
    console.log(req.url);
    return next(req.clone({
      headers: req.headers.append('X-Authentication-Token', 'mock authentication token'),
    })).pipe(
      catchError(err => {
        errorHandlerService.handleError(err.message);
        return throwError(() => new Error('All retries failed:'))
      })
    );
  }
// export function headerModifierInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//   const errorHandlerService = inject(ErrorHandlerService);
//   const cacheService = inject(CacheService);

//   console.log(req.url);

//   if (req.method === 'GET') {
//     return new Observable(observer => {
//       // First, check if we have the data cached
//       cacheService.getCache(req.url).then((cachedResponse) => {
//         if (cachedResponse) {
//           console.log('Serving from cache:', req.url);
//           observer.next(cachedResponse);
//           observer.complete();
//         } else {
//           // If no cache, proceed with the network request
//           next(req.clone({
//             headers: req.headers.append('X-Authentication-Token', 'mock authentication token'),
//           })).pipe(
//             retry(2),
//             tap(event => {
//               if (event instanceof HttpResponse) {
//                 cacheService.setCache(req.url, event.body);
//               }
//             }),
//             catchError(err => {
//               errorHandlerService.handleError(err.message);
//               return throwError(() => new Error('All retries failed:'));
//             })
//           )
//         }
//       });
//     });
//   } else {
//     return next(req.clone({
//       headers: req.headers.append('X-Authentication-Token', 'mock authentication token'),
//     })).pipe(
//       retry(2),
//       catchError(err => {
//         errorHandlerService.handleError(err.message);
//         return throwError(() => new Error('All retries failed:'));
//       })
//     );
//   }
// }