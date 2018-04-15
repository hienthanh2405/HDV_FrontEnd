import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'showed-columns-button',
    templateUrl: './showed-columns-button.component.html',
    styleUrls: ['./showed-columns-button.component.scss'],
    animations: [
    ]
})
export class ShowedColumnsButtonComponent implements OnInit {
    @Input() showedColumnList;
   
    isShowing: boolean = false;
    constructor() { }
    
    ngOnInit() {
    }

}