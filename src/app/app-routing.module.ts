import { RouterModule, Routes } from '@angular/router';
import { SportlerOverviewComponent } from './sportler-overview/sportler-overview.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: SportlerOverviewComponent,
        pathMatch: 'full'
    },
    {
        path: 'overview',
        component: SportlerOverviewComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}