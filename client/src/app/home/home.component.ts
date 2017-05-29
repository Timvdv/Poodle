import {Component, OnInit} from '@angular/core';
import {NewGameService} from '../shared/new-game.service';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    constructor(private newGameService: NewGameService) {
    }

    code: string = "";

    enterCode(event) {
        this.code = event;

    }
    
    submitCode(event) {
        console.log('subimitted:', this.code);
        this.newGameService.validateCode(this.code);

    }

    ngOnInit() {
        console.log('component is geladen')
    }
}
