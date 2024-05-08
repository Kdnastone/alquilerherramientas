import { Routes } from '@angular/router';
import { ToolListComponent } from './components/tool-list/tool-list.component'
import { BookingsComponent } from './components/bookings/bookings.component'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'booking',
        pathMatch: 'full'
    },
    {
        path: 'tools',
        component: ToolListComponent
    },
    {
        path: 'booking',
        component: BookingsComponent
    }
];
