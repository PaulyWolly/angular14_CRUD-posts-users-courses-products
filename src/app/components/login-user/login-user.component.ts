import { Component, Input, Inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LoginInterface } from 'src/app/models/login.interface';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Option } from '../../models/option.interface';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  @Input() buttonLabel!: string;

  loginUserForm!: FormGroup;
  dialogTitle: string = 'Add a Login';
  actionLabel: string = 'Add';
  actionBtn: string = "Save";
  radioButtonOptions: Option[] = [];
  submitting = false;
  submitted = false;

  loginUser!: LoginInterface[];
  isLoading = true;

  displayedColumns: string[] = ["email", "password"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private accountService: AccountService,
    // private dialog: MatDialog,
    // private dialogRef: MatDialogRef<LoginDialogComponent>,
    private _liveAnnouncer: LiveAnnouncer,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });

    if (this.editData) {

      this.loginUserForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
        // date: [''],
        // freshness: ['', Validators.required],
        // price: ['', Validators.required],
        // comment: ['', Validators.required],
      });

      this.actionBtn = "Update";
      // this.loginUserForm.controls['username'].setValue(this.editData.username);
      // this.loginUserForm.controls['firstname'].setValue(this.editData.firstname);
      // this.loginUserForm.controls['lastname'].setValue(this.editData.lastname);
      this.loginUserForm.controls['email'].setValue(this.editData.email);
      this.loginUserForm.controls['password'].setValue(this.editData.password);
      // this.loginUserForm.controls['date'].setValue(this.editData.date);
      // this.loginUserForm.controls['active'].setValue(this.editData.active);
      // this.loginUserForm.controls['role'].setValue(this.editData.role);
    }

    // this.openLoginUser();

    // this.addLoginUser();
  }

  // openLoginUser () {
  //   this.dialog.open(LoginUserComponent, {
  //     width: '37%',
  //     // data: row
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'update') {

  //       console.log('loginUserComponent dialog openned')
  //       // this.getAllProducts();
  //     }
  //   });
  // }

  // convenience getter for easy access to form fields
  get f() { return this.loginUserForm.controls; }

  addLoginUser() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    // if (this.loginUserForm.invalid) {
    //     return;
    // }

    if (!this.editData) {

      if (this.loginUserForm.valid) {
        this.accountService.login(this.f['email'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: (error: any) => {
                    // this.alertService.error(error);
                    this.submitting = false;
                }
            });
      }
    } else {
      this.actionLabel = "Update"
      // this.updateLoginUser();
    }

  }


}
