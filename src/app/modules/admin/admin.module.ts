import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { NavigationComponent } from './admin/navigation/navigation.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { BlogListComponent } from './admin/blog-list/blog-list.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavigationComponent,
    DashboardComponent,
    BlogListComponent,
    UserListComponent,
    CategoryListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    ModalModule.forRoot(),
  ],
})
export class AdminModule {}
