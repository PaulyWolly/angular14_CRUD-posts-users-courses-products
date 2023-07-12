import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CountryInterface } from 'src/app/models/country.interface';



@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['.//countries.component.scss']
})
export class CountriesComponent implements OnInit {
  @Input() buttonLabel!: string;

  products!: CountryInterface[];
  isLoading = true;

  displayedColumns: string[] = ["name", "code"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllCountries();
  }


  getAllCountries() {
    this.apiService.getCountries()
      .subscribe({
        next: (res: any) => {
          console.log('Existing Countries: ', res);

          this.isLoading = false;

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (res: any) => {
          this.isLoading = false;
          alert('Error occurred while fetching Countries');
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
