import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PostInterface } from '../../models/post.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UserInterface } from 'src/app/models/user.interface';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: UserInterface[];
  buttonLabel = "User";
  isLoading = true;


  displayedColumns: string[] = ["id", "name", "email", "website", "phone", "action"];
  // displayedColumns: string[] = ["id", "name", "email", "address", "company", "website", "phone", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.apiService.getUsers()
      .subscribe({
        next: (res: any) => {
          console.log('Our users: ', res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.isLoading = false;

        },
        error: (res: any) => {
          alert('Error occurred while fetching users');
          this.isLoading = false;
        }
      });
  }

  onEditUser(row: any) {
    this.dialog.open(UserDialogComponent, {
      width: '37%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllUsers();
      }
    });
  }

  onDeleteUser(id: any) {
    let text = "Are you sure you want to delete user " + id + " ?? \nOK or Cancel.";
    if (confirm(text) == true) {
      this.deleteTheUser(id);
    }
  }

  deleteTheUser(id: any) {
    this.apiService.deletePost(id)
      .subscribe({
        next: (res) => {
          console.log('user deleted');
          this.getAllUsers();
        },
        error: () => {
          alert('Error deleting user');
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
