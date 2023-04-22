import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  userForm!: FormGroup;
  actionBtn: string = "Save";
  isValid = false;


  @Output() callParent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiSrvc: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      // address: ['', Validators.required],
      // company: ['', Validators.required],
      website: [''],
      phone: ['']
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.userForm.controls['name'].setValue(this.editData.name);
      this.userForm.controls['email'].setValue(this.editData.email);
      // this.userForm.controls['address'].setValue(this.editData.address);
      // this.userForm.controls['street'].setValue(this.editData.address.street);
      // this.userForm.controls['suite'].setValue(this.editData.address.suite);
      // this.userForm.controls['city'].setValue(this.editData.address.city);
      // this.userForm.controls['zipcode'].setValue(this.editData.address.zipcode);
      // this.userForm.controls['company'].setValue(this.editData.company.name);
      // this.userForm.controls['bs'].setValue(this.editData.company.bs);
      this.userForm.controls['website'].setValue(this.editData.website);
      this.userForm.controls['phone'].setValue(this.editData.phone);
    }
  }


  addUser() {

    if (!this.editData) {
      if (this.userForm.valid) {
        this.apiSrvc.addUser(this.userForm.value)
          .subscribe({
            next: (res) => {

              alert('User added successfully');
              this.userForm.reset();
              this.apiSrvc.getUsers().subscribe({ next: (res) => { } });
              this.dialogRef.close('save');
              // reload users

            },
            error: () => {
              alert('Error while adding user');
            }
          });
      }
    } else {
      this.updateUser();
    }

  }

  updateUser() {
    this.apiSrvc.updateUser(this.userForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('User updated successfully');
          this.userForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating user");
        }
      });
  }

}
