import {Component} from "angular2/core";
@Component({
    selector:'my-list',
    template:`
            <h2>List of Fruits</h2>
            <ul>
                <li *ngFor="#myItem of itemList" (click)="onItemClicked(myItem)">
                    <a href="#">{{myItem.name}}</a>
                </li>
            </ul>
            <input type="text" [(ngModel)]="clickedItem.name">
            <button (click)="onDeleteItem()">Delete Item</button><br><br>
            
            <input type="text" #listItem>
            <button (click)="onAddItem(listItem)">Add Item</button>
        `
})
export class ItemComponent {
    public itemList = [
        {name:"Apple"},
        {name:"Orange"},
        {name:"Grapes"},
    ];
    public clickedItem = {name: ""};

    onItemClicked(item) {
        this.clickedItem = item;
    }

    onDeleteItem() {
        this.itemList.splice(this.itemList.indexOf(this.clickedItem), 1);
        this.clickedItem = {};
    }

    onAddItem(listItemName) {
        this.itemList.push({"name":listItemName.value});
        listItemName.value = "";
        this.clickedItem = {};
    }


}
