import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'MaterialBootstrapStarter';
  buttonLabel: any;

  // displayedColumns: string[] = ["id", "productName", "category", "date", "freshness", "price", "comment", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    // this.getAllProducts();


  }

  ngAfterViewInit() {
    localStorage.setItem('buttonLabel', '');
    localStorage.setItem('buttonValue', '');
  }


  // getAllProducts() {
  //   this.api.getProducts()
  //     .subscribe({
  //       next: (res: any) => {
  //         console.log('Our products: ', res);
  //         this.dataSource = new MatTableDataSource(res);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;

  //       },
  //       error: (res: any) => {
  //         alert('Error occurred while fetching products');
  //       }
  //     });
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // editProduct(row: any) {
  //   this.dialog.open(DialogComponent, {
  //     width: '30%',
  //     data: row
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'update') {
  //       this.getAllProducts();
  //     }
  //   });
  // }

  // deleteProduct(id: number) {
  //   this.api.deleteProduct(id)
  //     .subscribe({
  //       next: (res) => {
  //         alert('Produce deleted successfully');
  //         this.getAllProducts();
  //       },
  //       error: () => {
  //         alert('Error occurred while deleting product');
  //       }
  //     });
  // }

  // /** Announce the change in sort state */
  // announceSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
}
