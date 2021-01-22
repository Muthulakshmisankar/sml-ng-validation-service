import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SmlNgValidationServiceModule } from './../../projects/sml-ng-validation-service/src/public-api'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SmlNgValidationServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
