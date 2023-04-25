import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApplicationComponent } from './components/application/application.component';
import { AboutComponent } from './components/about/about.component';
import { CoursesComponent } from './components/courses/courses.component';
import { InitComponent } from './components/init/init.component';
import { PostsComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { ContextMenuComponent } from './components/contextmenu/contextmenu.component';
import { SidenavAutosizeExample } from './components/sidenav-autosize-example/sidenav-autosize-example';
import { ModalComponent } from './components/modal/modal.component';


const routes: Routes = [
  {
    path: 'init',
    component: InitComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'right-click',
    component: ContextMenuComponent
  },
  {
    path: 'sidenav',
    component: SidenavAutosizeExample
  },
  {
    path: 'modal',
    component: ModalComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
