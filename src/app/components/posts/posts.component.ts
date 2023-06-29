import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PostInterface } from '../../models/post.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() buttonLabel!: string;

  posts!: PostInterface[];

  displayedColumns: string[] = ["id", "title", "body", "action"];
  dataSource!: MatTableDataSource<any>;
  isLoading = true;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.apiService.getPosts()
      .subscribe({
        next: (res: any) => {
          console.log('Our posts: ', res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;

        },
        error: (res: any) => {
          alert('Error occurred while fetching posts');
          this.isLoading = false;
        }
      });
  }

  // .subscribe({ next: (res: any) => { console.log('connected to: ', res) }, error: (res: any) => { console.log('error with ', res) })


  onEditPost(row: any) {
    this.dialog.open(PostDialogComponent, {
      width: '37%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllPosts();
      }
    });
  }

  onDeletePost(id: any) {
    let text = "Are you sure you want to delete post " + id + " ?? \nOK or Cancel.";
    if (confirm(text) == true) {
      this.deleteThePost(id);
    }
  }

  deleteThePost(id: any) {
    this.apiService.deletePost(id)
      .subscribe({
        next: (res) => {
          console.log('post deleted');
          this.getAllPosts();
        },
        error: () => {
          alert('Error deeleting post');
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
