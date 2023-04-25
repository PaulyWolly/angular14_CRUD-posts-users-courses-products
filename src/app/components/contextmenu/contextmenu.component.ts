import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextMenuComponent {
  title = 'demo-menu';

  // we create an object that contains coordinates
  menuTopLeftPosition =  {x: 0, y: 0};


  // reference to the MatMenuTrigger in the DOM
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger!: MatMenuTrigger;

  /**
   * Method called when the user clicks with the right button
   * @param event MouseEvent, it contains the coordinates
   * @param item Our data contained in the row of the table
   */
  onRightClick(event: MouseEvent, item: Item) {
      // preventDefault avoids to show the visualization of the right-click menu of the browser
      event.preventDefault();

      // we record the mouse position in our object
      this.menuTopLeftPosition.x = event.clientX;
      this.menuTopLeftPosition.y = event.clientY;

      // we open the menu
      // we pass to the menu the information about our object
      // tslint:disable-next-line:object-literal-shorthand
      this.matMenuTrigger.menuData = {item: item};


      // we open the menu
      this.matMenuTrigger.openMenu();

  }

  // number of lines to show for the example
  getExamples(n: number) {
    return [... Array(n).keys()];
  }

  fixedMenu(item: any) {
    console.log('item ---->', item);
    alert( 'Value: ' + item);
  }
}

