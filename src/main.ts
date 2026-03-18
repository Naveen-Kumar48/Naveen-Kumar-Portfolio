import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/main';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { NgHcaptchaModule } from 'ng-hcaptcha';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      NgHcaptchaModule.forRoot({
        siteKey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2'
      })
    )
  ]
}).catch(err => console.error(err));
