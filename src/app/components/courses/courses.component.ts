import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CourseInterface } from 'src/app/models/course.interface';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
// import { CourseDialogComponent } from '../course-dialog/course-dialog.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['.//courses.component.scss']
})
export class CoursesComponent implements OnInit {
  @Input() buttonLabel!: string;

  courses!: CourseInterface[];
  isLoading = true;

  displayedColumns: string[] = ["id", "courseName", "category", "date", "comment", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.apiService.getCourses()
      .subscribe({
        next: (res: any) => {
          console.log('Our courses: ', res);

          this.isLoading = false;

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (res: any) => {
          this.isLoading = false;
          alert('Error occurred while fetching Courses');
        }
      });
  }


  onEditCourse(row: any) {
    this.dialog.open(CourseDialogComponent, {
      width: '37%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllCourses();
      }
    });
  }

  onDeleteCourse(id: any) {
    let text = "Are you sure you want to delete course " + id + " ?? \nOK or Cancel.";
    if (confirm(text) == true) {
      this.deleteTheCourse(id);
    }
  }

  deleteTheCourse(id: any) {
    this.apiService.deleteCourse(id)
      .subscribe({
        next: (res) => {
          console.log('course deleted');
          this.getAllCourses();
        },
        error: () => {
          alert('Error deleting course');
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
