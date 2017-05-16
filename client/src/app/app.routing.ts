import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'tekenen',
        component: DrawComponent
    },
    {
        path: 'display',
        component: DisplayComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
