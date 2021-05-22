import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleScreenComponent } from './sections/title-screen/title-screen.component';
import { RemoveHostDirective } from './directives/remove-host.directive';
import { FeaturesScreenComponent } from './sections/features-screen/features-screen.component';
import { DemoDbComponent } from './sections/demo-db/demo-db.component';
import { SupaClientService } from './services/supa-client.service';
import { DemoAuthComponent } from './sections/demo-auth/demo-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleScreenComponent,
    RemoveHostDirective,
    FeaturesScreenComponent,
    DemoDbComponent,
    DemoAuthComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SupaClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
