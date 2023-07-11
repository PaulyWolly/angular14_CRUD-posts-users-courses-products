import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LoginInterface } from 'src/app/models/login.interface';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() buttonLabel!: string;

  login!: LoginInterface[];
  isLoading = true;

  displayedColumns: string[] = ["id", "username", "firstname", "lastname", "email", "date", "active", "role", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllLogins();
  }

  getAllLogins() {
    this.apiService.getLogins()
      .subscribe({
        next: (res: any) => {
          console.log('Our List of Logins: ', res);

          this.isLoading = false;

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (res: any) => {
          this.isLoading = false;
          alert('Error occurred while fetching list of Logins');
        }
      });
  }


  onEditLogin(row: any) {
    this.dialog.open(LoginDialogComponent, {
      width: '37%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {

        this.getAllLogins();
      }
    });
  }

  onDeleteLogin(id: any) {
    let text = "Are you sure you want to delete User with " + id + " ?? \nOK or Cancel.";
    if (confirm(text) == true) {
      this.deleteTheLogin(id);
    }
  }

  deleteTheLogin(id: any) {
    this.apiService.deleteLogin(id)
      .subscribe({
        next: (res) => {
          console.log('User login deleted');
          this.getAllLogins();
        },
        error: () => {
          alert('Error deleting User Login');
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
