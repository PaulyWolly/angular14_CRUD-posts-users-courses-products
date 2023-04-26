import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mat-components',
  templateUrl: './mat-components.component.html',
  styleUrls: ['./mat-components.component.scss']
})
export class MatComponentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  categoriesControl = new FormControl([]);
  categories: string[] = ['Laravel','Angular', 'NPM', 'Jquery', 'PHP'];

  /**
   * Write code on Method
   *
   * method logical code
   */
  onCatRemoved(cat: string) {
    const categories = this.categoriesControl.value as string[];
    this.removeFirst(categories, cat);
    this.categoriesControl.setValue(categories); // To trigger change detection
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  private removeFirst(array: any[], toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}

