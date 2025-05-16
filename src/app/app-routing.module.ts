import { RouterModule, Routes } from '@angular/router';
import { SportlerOverviewComponent } from './components/sportler-overview/sportler-overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgModule } from '@angular/core';
import { AppRoles } from './app.roles';
import { appCanActivate } from './guard/app.auth.guard';
import { NoAccessComponent } from './components/no-access/no-access.component';

export const routes: Routes = [
  {
    path: '',
    component: SportlerOverviewComponent,
    pathMatch: 'full',
  },
  {
    path: 'overview',
    component: SportlerOverviewComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Read] },
  },
  { path: 'noaccess', component: NoAccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
