import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProductInterface } from 'src/app/models/product.interface';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['.//products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() buttonLabel!: string;

  products!: ProductInterface[];
  isLoading = true;

  displayedColumns: string[] = ["id", "productName", "category", "date", "freshness", "price", "comment", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.apiService.getProducts()
      .subscribe({
        next: (res: any) => {
          console.log('Our Products: ', res);

          this.isLoading = false;

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (res: any) => {
          this.isLoading = false;
          alert('Error occurred while fetching Products');
        }
      });
  }


  onEditProduct(row: any) {
    this.dialog.open(ProductDialogComponent, {
      width: '37%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {

        this.getAllProducts();
      }
    });
  }

  onDeleteProduct(id: any) {
    let text = "Are you sure you want to delete product " + id + " ?? \nOK or Cancel.";
    if (confirm(text) == true) {
      this.deleteTheProduct(id);
    }
  }

  deleteTheProduct(id: any) {
    this.apiService.deleteProduct(id)
      .subscribe({
        next: (res) => {
          console.log('product deleted');
          this.getAllProducts();
        },
        error: () => {
          alert('Error deleting product');
        }
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Announce the change in sort state */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
