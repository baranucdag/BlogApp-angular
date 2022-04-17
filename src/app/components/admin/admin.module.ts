import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { NavigationComponent } from './admin/navigation/navigation.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { BlogListComponent } from './admin/blog-list/blog-list.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavigationComponent,
    DashboardComponent,
    BlogListComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
