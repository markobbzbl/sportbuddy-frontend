import { Routes } from '@angular/router';
import { SportlerOverviewComponent } from './sportler-overview/sportler-overview.component';
import { ProfileComponent } from './profile/profile.component';

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
    }
];
