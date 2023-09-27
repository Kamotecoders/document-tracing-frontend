import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './views/admin/admin-main/admin-main.component';
import { ClientMainComponent } from './views/client/client-main/client-main.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { HomeComponent } from './views/nav/home/home.component';
import { AnnouncementsComponent } from './views/nav/announcements/announcements.component';
import { ContactsComponent } from './views/nav/contacts/contacts.component';
import { AboutComponent } from './views/nav/about/about.component';
import { ClientHomeComponent } from './views/client/client-home/client-home.component';
import { VotersComponent } from './views/client/voters/voters.component';
import { PsaComponent } from './views/client/psa/psa.component';
import { KasalanComponent } from './views/client/kasalan/kasalan.component';
import { BurialComponent } from './views/client/burial/burial.component';
import { DashboardComponent } from './views/client/dashboard/dashboard.component';
import { AdminHomeComponent } from './views/admin/admin-home/admin-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminMainComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'home', component: AdminHomeComponent },

      { path: 'announcement', component: AnnouncementsComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
  {
    path: 'client',
    component: ClientMainComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: ClientHomeComponent },
          { path: 'voters', component: VotersComponent },
          { path: 'psa', component: PsaComponent },
          { path: 'kasalan', component: KasalanComponent },
          { path: 'burial', component: BurialComponent },
        ],
      },
      {
        path: 'home',
        children: [
          { path: '', component: ClientHomeComponent },
          { path: 'voters', component: VotersComponent },
          { path: 'psa', component: PsaComponent },
          { path: 'kasalan', component: KasalanComponent },
          { path: 'burial', component: BurialComponent },
        ],
      },

      { path: 'announcement', component: AnnouncementsComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
  {
    path: 'index',
    component: LandingPageComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'announcement', component: AnnouncementsComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
