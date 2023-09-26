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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
