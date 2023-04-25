import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  buttonLabel!: any;
  addMode: boolean = false;

  constructor(
    private dialog: MatDialog,
    private apiSrvc: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkBtnView();
  }

  checkBtnView() {
    let value = localStorage.getItem('buttonValue');
    if (value == 'Post' || value == 'User' || value == 'Course' || value == 'Product') {
      this.showButton();
    } else {
      let value = localStorage.setItem('buttonVAlue', '')
      this.hideButton();

    }
  }

  getButtonLabel() {
    let label = localStorage.getItem('buttonLabel');
    this.buttonLabel = label;

    this.reloadComponent(true);
  }

  setButtonLabel(value: string) {
    localStorage.setItem('buttonLabel', value);

    this.getButtonLabel();
  }

  openDialog() {

    let value = localStorage.getItem('buttonValue');

    switch(value) {
      case 'Post': {
        this.dialog.open(PostDialogComponent, {
          width: '37%'
        }).afterClosed().subscribe(val => {
          if (val === 'save') {
            this.apiSrvc.getPosts()
              .subscribe({
                next: (res) => {
                  // reload application to see new product
                  window.location.reload();
                },
                error: () => {
                  alert('Error occured while opening Post dialog');
                }
              });
          }
        });
        break;
      }
      case 'User': {
        this.dialog.open(UserDialogComponent, {
          width: '37%'
        }).afterClosed().subscribe(val => {
          if (val === 'save') {
            this.apiSrvc.getUsers()
              .subscribe({
                next: (res) => {
                  // reload application to see new product
                  window.location.reload();
                },
                error: () => {
                  alert('Error occured while opening User dialog');
                }
              });
          }
        });
        break;
      }
      case 'Product': {
        this.dialog.open(ProductDialogComponent, {
          width: '37%'
        }).afterClosed().subscribe(val => {
          if (val === 'save') {
            this.apiSrvc.getProducts()
              .subscribe({
                next: (res) => {
                  // reload application to see new product
                  window.location.reload();
                },
                error: () => {
                  alert('Error occured while opening Product dialog');
                }
              });
          }
        });
        break;
      }
      case 'Course': {
        this.dialog.open(CourseDialogComponent, {
          width: '37%'
        }).afterClosed().subscribe(val => {
          if (val === 'save') {
            this.apiSrvc.getCourses()
              .subscribe({
                next: (res) => {
                  // reload application to see new course
                  window.location.reload();
                },
                error: () => {
                  alert('Error occured while opening Course dialog');
                }
              });
          }
        });
        break;
      }
      default:
        break;
    } // End of switch
  }

  redirectTo(url: string): void {
    // When skipLocationChange true, navigates without pushing a new state into history.
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:", this.router.url);
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`);
      });
    });
  }


  hideButtonLabel() {
    this.addMode = false;
    this.buttonLabel = '';
  }

  hideButton() {
    this.addMode = false;
    this.buttonLabel = '';
  }

  showButton() {
    this.addMode = true;
    let buttonValue = this.buttonLabel = JSON.stringify(localStorage.getItem('buttonValue'))
    let updatedValue = buttonValue.replaceAll('"', '');

    return this.buttonLabel = updatedValue;
  }

  setHiddenValue() {
    this.addMode = false;
    this.buttonLabel = '';
  }

  setBlankValue() {
    this.addMode = false;
    localStorage.setItem('buttonValue', '');
    this.buttonLabel = '';
  }

  setPostValue() {
    this.addMode = true;
    localStorage.setItem('buttonValue', 'Post');
    this.buttonLabel = 'Post';
  }

  setUserValue() {
    this.addMode = true;
    localStorage.setItem('buttonValue', 'User');
    this.buttonLabel = 'User';
  }

  setProductValue() {
    this.addMode = true;
    localStorage.setItem('buttonValue', 'Product');
    this.buttonLabel = 'Product';
  }

  setCourseValue() {
    this.addMode = true;
    localStorage.setItem('buttonValue', 'Course');
    this.buttonLabel = 'Course';
  }

}
