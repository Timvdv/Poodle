import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {routing} from './app.routing';

import {SocketioService} from './shared/socketio.service';
import {NewGameService} from './shared/new-game.service';

import {AppComponent} from './app.component';
import {DrawComponent} from './draw/draw.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {ComposeComponent} from './compose/compose.component';
import {DisplayComponent} from './display/display.component';

@NgModule({
    declarations: [
        AppComponent,
        DrawComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ComposeComponent,
        DisplayComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    providers: [
        SocketioService,
        NewGameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
