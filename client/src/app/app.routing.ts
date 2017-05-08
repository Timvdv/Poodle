import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';

const appRoutes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'tekenen',
        component: DrawComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
