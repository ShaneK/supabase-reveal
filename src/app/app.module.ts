import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TitleScreenComponent } from './sections/title-screen/title-screen.component';
import { RemoveHostDirective } from './directives/remove-host.directive';
import { FeaturesScreenComponent } from './sections/features-screen/features-screen.component';
import { DemoDbComponent } from './sections/demo-db/demo-db.component';
import { RevealService } from './services/reveal.service';
import { SupaClientService } from './services/supa-client.service';
import { DemoAuthComponent } from './sections/demo-auth/demo-auth.component';
import { DemoStorageComponent } from './sections/demo-storage/demo-storage.component';
import { DemoCompareComponent } from './sections/demo-compare/demo-compare.component';
import { CreditsComponent } from './sections/credits/credits.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleScreenComponent,
    RemoveHostDirective,
    FeaturesScreenComponent,
    DemoDbComponent,
    DemoAuthComponent,
    DemoStorageComponent,
    DemoCompareComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'login-success',
        redirectTo: '/#/9'
      },
      {
        path: '**',
        component: AppComponent
      }
    ])
  ],
  providers: [
    SupaClientService,
    RevealService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
