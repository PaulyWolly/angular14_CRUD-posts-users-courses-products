import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PostInterface } from '../../models/post.interface';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {

  // freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  postForm!: FormGroup;
  actionBtn: string = "Save";
  dialogTitle: string = "Add post";

  @Output() callParent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiSrvc: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.postForm.controls['title'].setValue(this.editData.title);
      this.postForm.controls['body'].setValue(this.editData.body);
    }
  }


  addPost() {

    if (!this.editData) {
      if (this.postForm.valid) {
        this.apiSrvc.addPost(this.postForm.value)
          .subscribe({
            next: (res) => {

              alert('Post added successfully');
              this.postForm.reset();
              this.apiSrvc.getPosts().subscribe({ next: (res) => { } });
              this.dialogRef.close('save');
              // reload products

            },
            error: () => {
              alert('Error while adding post');
            }
          });
      }
    } else {
      this.updatePost();
    }

  }

  updatePost() {
    this.apiSrvc.updatePost(this.postForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Post updated successfully');
          this.postForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating post");
        }
      });
  }

}
