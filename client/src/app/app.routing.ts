import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import { HomeComponent } from './home/home.component';
import { ComposeComponent } from './compose/compose.component';
import { DisplayComponent } from './display/display.component';
import { QuizComponent } from './quiz/quiz.component';
import { WaitingComponent } from './waiting/waiting.component';

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
        path: 'compose',
        component: ComposeComponent
    },
    {
        path: 'display',
        component: DisplayComponent
    },
    {
        path: 'quiz',
        component: QuizComponent
    },
    {
        path: 'waiting',
        component: WaitingComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
