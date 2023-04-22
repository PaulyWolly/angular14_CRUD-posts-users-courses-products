import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { PostInterface } from '../model/post.interface';
import { Observable } from 'rxjs';
import { UserInterface } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  posts: PostInterface[] = [];
  users: UserInterface[] = [];

  public apiUrl = 'http://localhost:8080/';

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
  deletePost(id: PostInterface): Observable<any> {
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
    return this.http.post<any>(this.apiUrl + 'productList/', data);
  }

  // Get ALL products (Read)
  getProducts() {
    return this.http.get<any>(this.apiUrl + 'productList/');
  }

  // Update 1 product (Update)
  updateProduct(data: any, id: number) {
    return this.http.put<any>(this.apiUrl + 'productList/' + id, data);
  }

  // Delete 1 product (Delete)
  deleteProduct(id: number) {
    return this.http.delete(this.apiUrl + 'productList/' + id);
  }


}
