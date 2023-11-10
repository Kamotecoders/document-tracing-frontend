import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminMainComponent } from './views/admin/admin-main/admin-main.component';
import { ClientMainComponent } from './views/client/client-main/client-main.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { AnnouncementsComponent } from './views/nav/announcements/announcements.component';
import { ContactsComponent } from './views/nav/contacts/contacts.component';
import { HomeComponent } from './views/nav/home/home.component';
import { AboutComponent } from './views/nav/about/about.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientHomeComponent } from './views/client/client-home/client-home.component';
import { VotersComponent } from './views/client/voters/voters.component';
import { PsaComponent } from './views/client/psa/psa.component';
import { KasalanComponent } from './views/client/kasalan/kasalan.component';
import { BurialComponent } from './views/client/burial/burial.component';
import { DashboardComponent } from './views/client/dashboard/dashboard.component';
import { AdminHomeComponent } from './views/admin/admin-home/admin-home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { GantchartComponent } from './gantchart/gantchart.component';
@NgModule({
  declarations: [
    AppComponent,

    AdminMainComponent,
    ClientMainComponent,
    LandingPageComponent,
    AnnouncementsComponent,
    ContactsComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ClientHomeComponent,
    VotersComponent,
    PsaComponent,
    KasalanComponent,
    BurialComponent,
    DashboardComponent,
    AdminHomeComponent,
    AppointmentFormComponent,
    ToggleButtonComponent,
    GantchartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
