import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';

import { PostsComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductsComponent } from './components/products/products.component';

// Angular Material module
import { MyMaterialModule } from './myMaterial.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApplicationComponent } from './components/application/application.component';
import { InitComponent } from './components/init/init.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderButtonComponent } from './components/header-button/header-button.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';


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
    CourseDialogComponent
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
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
