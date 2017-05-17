import {Component} from "angular2/core";
import {ItemComponent} from 'src/app/item-list.component';

@Component({
    selector: 'my-app',
    template: `<my-list></my-list>`,
    directives:[ItemComponent]
})
export class MyTemplate {}