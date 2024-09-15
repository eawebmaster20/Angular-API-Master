import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerModifierInterceptor } from './services/Http-interceptors/request.interceptors';
import { loggerInterceptor } from './services/Http-interceptors/logger.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(
      withInterceptors([headerModifierInterceptor,loggerInterceptor])
    )
  ]
};
