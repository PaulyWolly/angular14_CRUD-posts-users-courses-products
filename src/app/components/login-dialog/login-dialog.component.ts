import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginInterface } from '../../models/login.interface';
import { Option } from '../../models/option.interface';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  freshnessList: string[] = ["Brand New", "Second Hand", "Refurbished"];
  loginForm!: FormGroup;
  dialogTitle: string = 'Add a Login';
  actionLabel: string = 'Add';
  actionBtn: string = "Save";
  radioButtonOptions: Option[] = [];

  model1!: any;
  model2!: any;


  @Output() callParent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiSrvc: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      date: ['', Validators.required],
      active: ['', Validators.required],
      role: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.loginForm.controls['username'].setValue(this.editData.username);
      this.loginForm.controls['firstname'].setValue(this.editData.firstname);
      this.loginForm.controls['lastname'].setValue(this.editData.lastname);

      this.loginForm.controls['email'].setValue(this.editData.email);
      this.loginForm.controls['date'].setValue(this.editData.date);
      this.loginForm.controls['active'].setValue(this.editData.active);
      this.loginForm.controls['role'].setValue(this.editData.role);
    }
  }


  addLogin() {

    if (!this.editData) {

      if (this.loginForm.valid) {
        this.apiSrvc.addLogin(this.loginForm.value)
          .subscribe({
            next: (res) => {

              alert('User Login added successfully');
              this.loginForm.reset();
              this.apiSrvc.getLogins().subscribe({ next: (res) => { } });
              this.dialogRef.close('save');
              // reload logins

            },
            error: () => {
              alert('Error while adding User Login');
            }
          });
      }
    } else {
      this.actionLabel = "Update"
      this.updateLogin();
    }

  }


  updateLogin() {
    this.apiSrvc.updateLogin(this.loginForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('User Login updated successfully');
          this.loginForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating User Login");
        }
      });
  }

}
