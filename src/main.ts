import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDe, 'de', localeDeExtra);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
