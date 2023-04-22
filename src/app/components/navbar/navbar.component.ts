import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(ProductDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.apiService.getProducts()
          .subscribe({
            next: (res) => {
              // reload application to see new product
              window.location.reload();
            },
            error: () => {
              alert('Error occured while getting products');
            }
          });
      }
    });
  }

}
