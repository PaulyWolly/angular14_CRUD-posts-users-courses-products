import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PostsComponent } from './components/posts/posts.component';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { UsersComponent } from './components/users/users.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

// Angular Material module
import { MyMaterialModule } from './myMaterial.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApplicationComponent } from './components/application/application.component';
import { InitComponent } from './components/init/init.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderButtonComponent } from './components/header-button/header-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { ContextMenuComponent } from './components/contextmenu/contextmenu.component';
import { SidenavAutosizeExample } from './components/sidenav-autosize-example/sidenav-autosize-example';
import { ModalComponent } from './components/modal/modal.component';
import { MatComponentsComponent } from './components/mat-components/mat-components.component';
import { MatChipsModule } from '@angular/material/chips';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { Breadcrumb2Component } from './components/breadcrumb2/breadcrumb2.component';
import { CountriesComponent } from './components/countries/countries.component';
import { LoginComponent } from './components/login/login.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { LoginUserComponent } from './components/login-user/login-user.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostDialogComponent,
    UsersComponent,
    UserDialogComponent,
    PostsComponent,
    PostDialogComponent,
    HeaderComponent,
    HeaderButtonComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    UsersComponent,
    ProductDialogComponent,
    ProductsComponent,
    ApplicationComponent,
    InitComponent,
    CoursesComponent,
    CourseDialogComponent,
    ContextMenuComponent,
    SidenavAutosizeExample,
    ModalComponent,
    MatComponentsComponent,
    BreadcrumbComponent,
    Breadcrumb2Component,
    CountriesComponent,
    LoginComponent,
    LoginDialogComponent,
    LoginUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MyMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatMenuModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
