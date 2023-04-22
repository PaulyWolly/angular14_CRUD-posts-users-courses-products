import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CourseInterface } from 'src/app/models/course.interface';
import { Option } from 'src/app/models/option.interface';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  // freshnessList: string[] = ["Brand New", "Second Hand", "Refurbished"];
  courseForm!: FormGroup;
  actionBtn: string = "Save";
  dialogTitle = "Add Course"

  radioButtonOptions: Option[] = [];

  model1!: any;
  model2!: any;


  @Output() callParent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiSrvc: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    // for (var i = 1; i < 5; i++) {
    //   var defaultChecked = i == 1;
    //   this.radioButtonOptions.push({
    //     name: 'Option ' + i,
    //     value: i,
    //     checked: defaultChecked,
    //   });
    // }
  }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      category: ['', Validators.required],
      date: [''],
      // freshness: ['', Validators.required],
      // price: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.dialogTitle = "Update Course"
      this.courseForm.controls['courseName'].setValue(this.editData.courseName);
      this.courseForm.controls['category'].setValue(this.editData.category);
      this.courseForm.controls['date'].setValue(this.editData.date);
      // this.courseForm.controls['freshness'].setValue(this.editData.freshness);
      // this.courseForm.controls['price'].setValue(this.editData.price);
      this.courseForm.controls['comment'].setValue(this.editData.comment);
    }
  }


  addCourse() {

    if (!this.editData) {
      if (this.courseForm.valid) {
        this.apiSrvc.addCourse(this.courseForm.value)
          .subscribe({
            next: (res) => {

              alert('Course added successfully');
              this.courseForm.reset();
              this.apiSrvc.getCourses().subscribe({ next: (res) => { } });
              this.dialogRef.close('save');
              // reload courses

            },
            error: () => {
              alert('Error while adding course');
            }
          });
      }
    } else {
      this.updateCourse();
    }

  }


  updateCourse() {
    this.apiSrvc.updateCourse(this.courseForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Course updated successfully');
          this.courseForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating course");
        }
      });
  }

}
