import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleScreenComponent } from './sections/title-screen/title-screen.component';
import { RemoveHostDirective } from './directives/remove-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    TitleScreenComponent,
    RemoveHostDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
