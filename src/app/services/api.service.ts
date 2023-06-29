import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PostInterface } from '../models/post.interface';
import { UserInterface } from '../models/user.interface';
import { CourseInterface } from '../models/course.interface';
import { ProductInterface } from '../models/product.interface';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  posts: PostInterface[] = [];
  users: UserInterface[] = [];
  courses: CourseInterface[] = [];
  products: ProductInterface[] = [];

  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  // POSTS

  //  Add new post (Create)
  addPost(data: PostInterface) {
    return this.http.post<PostInterface>(this.apiUrl + 'posts', data);
  }

  // Get all posts (Read)
  getPosts() {
    return this.http.get<PostInterface[]>(this.apiUrl + 'posts');
  }

  //Update post with id and data (Update)
  updatePost(data: PostInterface, id: number) {
    return this.http.put<any>(this.apiUrl + 'posts/' + id, data);
  }

  // Delete post with id (Delete)
  deletePost(id: PostInterface) {
    console.log('Deleting posts with Id: ', id);
    return this.http.delete(this.apiUrl + 'posts/' + id);
  }

  // USERS

  //  Add new user (Create)
  addUser(data: UserInterface) {
    return this.http.post<UserInterface>(this.apiUrl + 'users', data);
  }

  // Get all users (Read)
  getUsers(): Observable<any> {
    return this.http.get<UserInterface[]>(this.apiUrl + 'users');
  }

  // Update user with id and data (Update)
  updateUser(data: UserInterface, id: number) {
    return this.http.put<any>(this.apiUrl + 'users/' + id, data);
  }

  // Delete user with id (Delete)
  deleteUsert(id: UserInterface): Observable<any> {
    console.log('Deleting user with Id: ', id);
    return this.http.delete(this.apiUrl + 'users/' + id);
  }

  // PRODUCTS

  // Add new product (Create)
  addProduct(data: any) {
    return this.http.post<any>(this.apiUrl + 'products/', data);
  }

  // Get ALL products (Read)
  getProducts() {
    return this.http.get<any>(this.apiUrl + 'products/');
  }

  // Update 1 product (Update)
  updateProduct(data: any, id: number) {
    return this.http.put<any>(this.apiUrl + 'products/' + id, data);
  }

  // Delete 1 product (Delete)
  deleteProduct(id: number) {
    return this.http.delete(this.apiUrl + 'products/' + id);
  }

  // COURSES

  // Add new product (Create)
  addCourse(data: CourseInterface) {
    return this.http.post<any>(this.apiUrl + 'courses/', data);
  }

  // Get ALL courses (Read)
  getCourses() {
    return this.http.get<CourseInterface>(this.apiUrl + 'courses/');
  }

  // Update 1 course (Update)
  updateCourse(data: CourseInterface, id: number) {
    return this.http.put<any>(this.apiUrl + 'courses/' + id, data);
  }

  // Delete 1 course (Delete)
  deleteCourse(id: number) {
    return this.http.delete(this.apiUrl + 'courses/' + id);
  }


}
