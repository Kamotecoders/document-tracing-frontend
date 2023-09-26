import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './views/admin/admin-main/admin-main.component';
import { ClientMainComponent } from './views/client/client-main/client-main.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { HomeComponent } from './views/nav/home/home.component';
import { AnnouncementsComponent } from './views/nav/announcements/announcements.component';
import { ContactsComponent } from './views/nav/contacts/contacts.component';
import { AboutComponent } from './views/nav/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'admin', component: AdminMainComponent },
  { path: 'client', component: ClientMainComponent },
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
