//Ng dependencies
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Local dependencies
import { AppComponent } from './app.component';
import { AlertComponent } from './_components/alert/alert.component';
import { HomeComponent } from './home/home.component';
import { AngularMaterialModule } from './material/material.module';
import { httpInterceptorProviders } from './_interceptors/index';
import { ModalComponent } from './modal/modal.component';
import { MembersComponent } from './members/members.component';
//Third party dependencies
import { NgChartsModule } from 'ng2-charts';
import { DeleteErgWarningComponent } from './delete-erg-warning/delete-erg-warning.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    ModalComponent,
    MembersComponent,
    DeleteErgWarningComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
