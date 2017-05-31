import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

    clicked(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var Attr = target.attributes.data;
        var string = Attr.nodeValue;

        if (string == 'true') {
            alert("Great! That was the right answer");
        } else {
            alert("wrong answer!");
        }
    }

    constructor() {
    }

    ngOnInit() {

    }

}








